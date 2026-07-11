"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { synthesizeHebrewToWavUrl, isHebrewTtsSupported, onHebrewTtsLoadProgress } from "@/lib/hebrewTts";

export type ReadAloudPhase = "idle" | "loading-model" | "generating" | "error";

const TARGET_CHUNK_LEN = 110;

/**
 * מפצל טקסט למשפטים ומקבץ אותם לנתחים בגודל ~TARGET_CHUNK_LEN - כי סינתזת המודל הנוירוני
 * איטית (עשרות שניות לפסקה שלמה, חוסם את ה-thread הראשי כי אין תמיכה ב-crossOriginIsolated
 * threads בדפדפן). נתחים קטנים = השמעה מתחילה מהר, וממשיכה ברצף תוך סינתוז הנתח הבא ברקע.
 */
function splitIntoSpeechChunks(text: string): string[] {
  const sentences = text
    .split(/(?<=[.!?:])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return [];

  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    if (buf && buf.length + s.length + 1 > TARGET_CHUNK_LEN) {
      chunks.push(buf);
      buf = s;
    } else {
      buf = buf ? `${buf} ${s}` : s;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

export function useHebrewReadAloud(text: string) {
  const chunks = useMemo(() => splitIntoSpeechChunks(text), [text]);

  const [supported, setSupported] = useState(false);
  const [phase, setPhase] = useState<ReadAloudPhase>("idle");
  const [loadPct, setLoadPct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [fallback, setFallback] = useState(false);
  const [chunkProgress, setChunkProgress] = useState({ current: 0, total: chunks.length });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<number, string>>(new Map());
  const synthesizingRef = useRef<Map<number, Promise<string>>>(new Map());
  const currentIndexRef = useRef(0);
  const hasLoadedModelRef = useRef(false);
  const rateRef = useRef(1);
  const stoppedRef = useRef(true);

  rateRef.current = rate;

  useEffect(() => setSupported(isHebrewTtsSupported()), []);
  useEffect(() => onHebrewTtsLoadProgress(setLoadPct), []);

  // מנקה נתחים ומצב השמעה כשהטקסט משתנה (מעבר לסעיף אחר)
  useEffect(() => {
    audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url));
    audioCacheRef.current.clear();
    synthesizingRef.current.clear();
    currentIndexRef.current = 0;
    stoppedRef.current = true;
    setPhase("idle");
    setPlaying(false);
    setFallback(false);
    setChunkProgress({ current: 0, total: chunks.length });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [chunks]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function speakWithWebSpeechFallback() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "he-IL";
    utter.rate = rateRef.current;
    utter.onstart = () => setPlaying(true);
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utter);
  }

  const ensureChunkSynthesized = useCallback((i: number): Promise<string> => {
    const cached = audioCacheRef.current.get(i);
    if (cached) return Promise.resolve(cached);
    const inFlight = synthesizingRef.current.get(i);
    if (inFlight) return inFlight;

    const p = synthesizeHebrewToWavUrl(chunks[i]).then((url) => {
      audioCacheRef.current.set(i, url);
      synthesizingRef.current.delete(i);
      hasLoadedModelRef.current = true;
      return url;
    });
    synthesizingRef.current.set(i, p);
    return p;
  }, [chunks]);

  function ensureAudioEl(): HTMLAudioElement {
    if (!audioRef.current) {
      const el = new Audio();
      audioRef.current = el;
    }
    return audioRef.current;
  }

  const playFromIndex = useCallback(async (i: number) => {
    if (i >= chunks.length) {
      setPlaying(false);
      setPhase("idle");
      currentIndexRef.current = 0;
      return;
    }
    stoppedRef.current = false;
    currentIndexRef.current = i;
    setChunkProgress({ current: i + 1, total: chunks.length });
    setPhase(hasLoadedModelRef.current ? "generating" : "loading-model");

    let url: string;
    try {
      url = await ensureChunkSynthesized(i);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Hebrew TTS synthesis failed, falling back to browser voice", err);
      setPhase("error");
      setFallback(true);
      speakWithWebSpeechFallback();
      return;
    }

    if (stoppedRef.current) return; // המשתמש עצר בזמן שהסינתוז רץ

    const el = ensureAudioEl();
    el.src = url;
    el.playbackRate = rateRef.current;
    setPhase("idle");
    try {
      await el.play();
    } catch {
      return; // חסימת autoplay וכד' - פשוט לא מתחילים
    }
    setPlaying(true);
    // מסנתז את הנתח הבא ברקע תוך כדי השמעת הנוכחי, כדי לצמצם הפסקות בין נתחים
    if (i + 1 < chunks.length) {
      ensureChunkSynthesized(i + 1).catch(() => {});
    }
  }, [chunks, ensureChunkSynthesized]);

  useEffect(() => {
    const el = ensureAudioEl();
    const onEnded = () => {
      const next = currentIndexRef.current + 1;
      if (next < chunks.length && !stoppedRef.current) {
        playFromIndex(next);
      } else {
        setPlaying(false);
        setPhase("idle");
        currentIndexRef.current = 0;
      }
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [chunks, playFromIndex]);

  const toggle = useCallback(() => {
    if (fallback) {
      if (playing) {
        window.speechSynthesis.cancel();
        setPlaying(false);
      } else {
        speakWithWebSpeechFallback();
      }
      return;
    }

    // בודקים את מצב האלמנט האמיתי (לא את ה-state של React) כדי להימנע ממרוץ: setPlaying(true)
    // רץ אחרי await בתוך playFromIndex, וה-closure של הכפתור עלול עדיין להחזיק בערך "playing"
    // ישן אם המשתמש לוחץ מהר מאוד אחרי שההשמעה כבר התחילה בפועל.
    const el = audioRef.current;
    const actuallyPlaying = !!el && !el.paused && !el.ended && el.currentTime > 0;

    if (actuallyPlaying) {
      stoppedRef.current = true;
      el.pause();
      setPlaying(false);
      setPhase("idle");
      return;
    }

    if (chunks.length === 0) return;
    stoppedRef.current = false;

    // אם כבר יש אודיו טעון לנתח הנוכחי (הושהה באמצע) - ממשיכים מאותה נקודה בדיוק,
    // בלי לעבור שוב דרך playFromIndex (שהיה מאפס את src וחוזר לתחילת הנתח)
    const cachedUrl = audioCacheRef.current.get(currentIndexRef.current);
    if (el && cachedUrl && el.src === cachedUrl) {
      el.playbackRate = rateRef.current;
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {});
      return;
    }

    playFromIndex(currentIndexRef.current);
  }, [fallback, chunks, playFromIndex]);

  const restart = useCallback(() => {
    if (fallback) {
      speakWithWebSpeechFallback();
      return;
    }
    if (chunks.length === 0) return;
    stoppedRef.current = true;
    audioRef.current?.pause();
    playFromIndex(0);
  }, [fallback, chunks, playFromIndex]);

  const skip = useCallback((deltaSeconds: number) => {
    if (fallback) return;
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Math.min(Math.max(el.currentTime + deltaSeconds, 0), el.duration);
  }, [fallback]);

  const changeRate = useCallback((newRate: number) => {
    setRate(newRate);
    if (audioRef.current) audioRef.current.playbackRate = newRate;
  }, []);

  return { supported, phase, loadPct, playing, rate, fallback, chunkProgress, toggle, restart, skip, changeRate };
}
