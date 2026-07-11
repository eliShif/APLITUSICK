// רץ בתוך Web Worker נפרד - כך שהחישוב הכבד של סינתזת הקול (WASM חד-thread, יכול לקחת
// עשרות שניות לכל נתח טקסט) לא חוסם את ה-thread הראשי של הדף, והממשק נשאר מגיב (אפשר
// ללחוץ עצירה/השהיה) גם באמצע הסינתוז.

type ProgressInfo = { status: string; progress?: number; file?: string };
type Synthesizer = (text: string) => Promise<{ audio: Float32Array; sampling_rate: number }>;

let synthesizerPromise: Promise<Synthesizer> | null = null;
const fileProgress = new Map<string, number>();

async function loadSynthesizer(): Promise<Synthesizer> {
  const { pipeline, env } = await import("@huggingface/transformers");
  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = "/models/";

  const synth = await pipeline("text-to-speech", "mms-tts-heb", {
    dtype: "q8",
    progress_callback: (info: ProgressInfo) => {
      if (typeof info.progress === "number" && info.file) {
        fileProgress.set(info.file, info.progress);
        const values = [...fileProgress.values()];
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        self.postMessage({ type: "progress", pct: Math.round(avg) });
      }
    },
  });
  self.postMessage({ type: "progress", pct: 100 });
  return synth as unknown as Synthesizer;
}

function getSynthesizer(): Promise<Synthesizer> {
  if (!synthesizerPromise) {
    synthesizerPromise = loadSynthesizer().catch((err) => {
      synthesizerPromise = null;
      throw err;
    });
  }
  return synthesizerPromise;
}

self.onmessage = async (event: MessageEvent<{ type: "synthesize"; id: number; text: string }>) => {
  const { type, id, text } = event.data;
  if (type !== "synthesize") return;
  try {
    const synth = await getSynthesizer();
    const { audio, sampling_rate } = await synth(text);
    // ה-Float32Array מועבר (transfer) בלי העתקה - מהיר ולא כפול זיכרון
    const buffer = audio.buffer as ArrayBuffer;
    (self as unknown as Worker).postMessage(
      { type: "result", id, audio, sampling_rate },
      [buffer]
    );
  } catch (err) {
    self.postMessage({ type: "error", id, message: err instanceof Error ? err.message : String(err) });
  }
};
