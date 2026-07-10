"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];
// הערכה גסה של קצב דיבור בקצב רגיל (rate=1), כדי לתרגם "5 שניות" למספר מילים לדלג עליהן -
// ל-Web Speech API אין יכולת "seek" אמיתית לפי זמן, זו קירוב סביר בהיעדר תמיכה כזו בדפדפן.
const WORDS_PER_SECOND_AT_RATE_1 = 2.5;

function stripForSpeech(text: string): string {
  return text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ReadAloudBar({ text }: { text: string }) {
  const cleanText = useMemo(() => stripForSpeech(text), [text]);
  const wordOffsets = useMemo(() => {
    const offsets: number[] = [];
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(cleanText))) offsets.push(m.index);
    return offsets;
  }, [cleanText]);

  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const wordIndexRef = useRef(0);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  useEffect(() => {
    if (!supported) return;
    function pickVoice() {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current = voices.find((v) => v.lang?.toLowerCase().startsWith("he")) ?? null;
    }
    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
  }, [supported]);

  // עצירה אוטומטית כשעוזבים את הנושא/הטאב
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function findWordIndexForChar(absoluteChar: number): number {
    let idx = 0;
    for (let i = 0; i < wordOffsets.length; i++) {
      if (wordOffsets[i] <= absoluteChar) idx = i;
      else break;
    }
    return idx;
  }

  function speakFromWord(wordIndex: number, speechRate: number) {
    if (!supported || wordOffsets.length === 0) return;
    const clamped = Math.min(Math.max(wordIndex, 0), wordOffsets.length - 1);
    const startChar = wordOffsets[clamped];
    const slice = cleanText.slice(startChar);

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(slice);
    utter.lang = "he-IL";
    utter.rate = speechRate;
    if (voiceRef.current) utter.voice = voiceRef.current;

    utter.onboundary = (e) => {
      if (typeof e.charIndex === "number") {
        wordIndexRef.current = findWordIndexForChar(startChar + e.charIndex);
      }
    };
    utter.onend = () => {
      setPlaying(false);
      wordIndexRef.current = 0;
    };
    utter.onerror = () => {
      setPlaying(false);
    };

    utterRef.current = utter;
    wordIndexRef.current = clamped;
    window.speechSynthesis.speak(utter);
    setPlaying(true);
  }

  function togglePlay() {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      speakFromWord(wordIndexRef.current, rate);
    }
  }

  function restart() {
    wordIndexRef.current = 0;
    speakFromWord(0, rate);
  }

  function skip(deltaSeconds: number) {
    const words = Math.round(WORDS_PER_SECOND_AT_RATE_1 * rate * Math.abs(deltaSeconds));
    const delta = deltaSeconds < 0 ? -words : words;
    const target = wordIndexRef.current + delta;
    if (playing) {
      speakFromWord(target, rate);
    } else {
      wordIndexRef.current = Math.min(Math.max(target, 0), wordOffsets.length - 1);
    }
  }

  function changeRate(newRate: number) {
    setRate(newRate);
    if (playing) speakFromWord(wordIndexRef.current, newRate);
  }

  if (!supported) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-1.5">
      <button
        onClick={togglePlay}
        aria-label={playing ? "עצור הקראה" : "הקרא בקול"}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          playing
            ? "bg-emerald-600 text-white"
            : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
        }`}
      >
        {playing ? "⏸ עצור" : "🔊 הקראה"}
      </button>
      <button
        onClick={() => skip(-5)}
        aria-label="אחורה 5 שניות"
        title="אחורה 5 שניות"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-2.5 py-1 text-xs font-semibold"
      >
        ⏪ 5 שנ׳
      </button>
      <button
        onClick={() => skip(5)}
        aria-label="קדימה 5 שניות"
        title="קדימה 5 שניות"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-2.5 py-1 text-xs font-semibold"
      >
        5 שנ׳ ⏩
      </button>
      <button
        onClick={restart}
        aria-label="התחל מחדש"
        title="התחל מחדש"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-2.5 py-1 text-xs font-semibold"
      >
        🔁 התחלה
      </button>
      <select
        value={rate}
        onChange={(e) => changeRate(Number(e.target.value))}
        aria-label="מהירות הקראה"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-2 py-1 text-xs font-semibold cursor-pointer"
      >
        {RATES.map((r) => (
          <option key={r} value={r}>
            {r}x
          </option>
        ))}
      </select>
    </div>
  );
}
