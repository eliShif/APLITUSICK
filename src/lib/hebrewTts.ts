"use client";

// מנוע הקראה עברית מקומי - מודל נוירוני חופשי (facebook/mms-tts-heb, MMS של Meta) שהומר
// ל-ONNX וקוונטז (q8, ~37MB) ומוגש ישירות מהאתר (public/models/mms-tts-heb) - רץ כולו בדפדפן
// דרך @huggingface/transformers (WASM), בלי שרת, בלי מפתח API, בלי עלות. ההורדה קורית פעם
// אחת ונשמרת ב-cache של הדפדפן/session. רישיון המודל: CC-BY-NC-4.0 (שימוש לא-מסחרי).
//
// הסינתוז עצמו רץ ב-Web Worker נפרד (hebrewTts.worker.ts) ולא ב-thread הראשי - כי חישוב
// WASM חד-thread (אין crossOriginIsolated בדף, אז onnxruntime-web נופל אוטומטית לתריד יחיד)
// יכול לקחת עשרות שניות לנתח טקסט, וזה היה חוסם את הדף (אי אפשר ללחוץ על שום כפתור) לו רץ
// ב-thread הראשי.

type WorkerResultMsg = { type: "result"; id: number; audio: Float32Array; sampling_rate: number };
type WorkerErrorMsg = { type: "error"; id: number; message: string };
type WorkerProgressMsg = { type: "progress"; pct: number };
type WorkerMsg = WorkerResultMsg | WorkerErrorMsg | WorkerProgressMsg;

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, { resolve: (v: { audio: Float32Array; sampling_rate: number }) => void; reject: (e: Error) => void }>();

let lastProgress = 0;
const progressListeners = new Set<(pct: number) => void>();

export function onHebrewTtsLoadProgress(cb: (pct: number) => void): () => void {
  progressListeners.add(cb);
  cb(lastProgress);
  return () => progressListeners.delete(cb);
}

function reportProgress(pct: number) {
  lastProgress = pct;
  progressListeners.forEach((cb) => cb(pct));
}

function getWorker(): Worker {
  if (!worker) {
    // ה-worker בנוי מראש ל-public/hebrewTts.worker.js (esbuild, ראו package.json build:worker) -
    // לא נטען כ-import מנוהל ע"י Turbopack, כי בגרסה הזו new Worker(new URL(...)) רק מעתיק
    // את קובץ ה-TS הגולמי בלי לקמפל אותו (לא רץ בדפדפן). URL קבוע נטען תמיד כראוי.
    worker = new Worker("/hebrewTts.worker.js", { type: "module" });
    worker.onmessage = (event: MessageEvent<WorkerMsg>) => {
      const msg = event.data;
      if (msg.type === "progress") {
        reportProgress(msg.pct);
        return;
      }
      const entry = pending.get(msg.id);
      if (!entry) return;
      pending.delete(msg.id);
      if (msg.type === "result") {
        entry.resolve({ audio: msg.audio, sampling_rate: msg.sampling_rate });
      } else {
        entry.reject(new Error(msg.message));
      }
    };
    worker.onerror = (event) => {
      // שגיאה כללית ב-worker (למשל טעינת המודול נכשלה) - דוחים את כל הבקשות הממתינות
      const err = new Error(event.message || "Hebrew TTS worker error");
      pending.forEach(({ reject }) => reject(err));
      pending.clear();
    };
  }
  return worker;
}

function synthesizeRaw(text: string): Promise<{ audio: Float32Array; sampling_rate: number }> {
  const id = nextId++;
  const w = getWorker();
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ type: "synthesize", id, text });
  });
}

export function isHebrewTtsSupported(): boolean {
  return typeof window !== "undefined" && "WebAssembly" in window && typeof Worker !== "undefined";
}

function floatTo16BitPCM(samples: Float32Array): DataView {
  const buffer = new ArrayBuffer(samples.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return view;
}

function encodeWav(audio: Float32Array, sampleRate: number): Blob {
  const pcm = floatTo16BitPCM(audio);
  const blockAlign = 2;
  const byteRate = sampleRate * blockAlign;
  const buffer = new ArrayBuffer(44 + pcm.byteLength);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + pcm.byteLength, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, pcm.byteLength, true);
  new Uint8Array(buffer, 44).set(new Uint8Array(pcm.buffer));

  return new Blob([buffer], { type: "audio/wav" });
}

/** מייצר קובץ WAV מטקסט עברי ומחזיר URL זמני להשמעה ב-<audio>. קוראים ל-URL.revokeObjectURL כשמסיימים. */
export async function synthesizeHebrewToWavUrl(text: string): Promise<string> {
  const { audio, sampling_rate } = await synthesizeRaw(text);
  const blob = encodeWav(audio, sampling_rate);
  return URL.createObjectURL(blob);
}
