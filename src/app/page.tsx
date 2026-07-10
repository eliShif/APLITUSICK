import Link from "next/link";
import { topics } from "@/content/topics";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-l from-emerald-600 to-teal-600 p-6 sm:p-8 text-white">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2.5">
          🧪 הכנה למבחן בכימיה אורגנית
        </h1>
        <p className="text-emerald-50 max-w-2xl leading-relaxed">
          כל נושאי הקורס במקום אחד: סיכומים עם דגש על ההבדלים בין מנגנונים וחומרים, תרשימי זרימה,
          מודלים תלת-ממדיים אינטראקטיביים, שאלונים ומשחקי התאמה. בהצלחה במבחן!
        </p>
        <Link
          href="/break"
          className="inline-block mt-4 rounded-full bg-white/15 hover:bg-white/25 transition px-4 py-2 text-sm font-semibold backdrop-blur-sm"
        >
          צריך/ה הפסקה? 🐶🐱
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-extrabold tracking-tight mb-4">נושאי לימוד</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 transition hover:border-emerald-500/60 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl dark:bg-emerald-900/30">
                {t.icon}
              </div>
              <div className="mt-3 font-extrabold leading-snug tracking-tight text-neutral-900 transition group-hover:text-emerald-600 dark:text-neutral-100">
                {t.title}
              </div>
              {t.subtitle && (
                <div className="mt-1.5 text-sm leading-relaxed text-neutral-500">{t.subtitle}</div>
              )}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:bg-white/10">
                  {t.quiz.length} שאלות
                </span>
                {t.matchingGame && (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:bg-white/10">
                    משחק התאמה
                  </span>
                )}
                {t.molecules?.length ? (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:bg-white/10">
                    {t.molecules.length} מודלים 3D
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
