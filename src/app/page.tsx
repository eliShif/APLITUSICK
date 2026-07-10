import Link from "next/link";
import { topics } from "@/content/topics";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-l from-emerald-600 to-teal-600 p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">🧪 הכנה למבחן בכימיה אורגנית</h1>
        <p className="text-emerald-50 max-w-2xl">
          כל נושאי הקורס במקום אחד: סיכומים עם דגש על ההבדלים בין מנגנונים וחומרים, תרשימי זרימה,
          מודלים תלת-ממדיים אינטראקטיביים, שאלונים ומשחקי התאמה. בהצלחה במבחן!
        </p>
        <Link
          href="/break"
          className="inline-block mt-4 rounded-full bg-white/20 hover:bg-white/30 transition px-4 py-2 text-sm font-semibold"
        >
          צריך/ה הפסקה? 🐶🐱
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">נושאי לימוד</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="group rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 transition hover:border-emerald-500 hover:shadow-md"
            >
              <div className="text-3xl mb-2">{t.icon}</div>
              <div className="font-bold group-hover:text-emerald-600 transition">{t.title}</div>
              {t.subtitle && <div className="text-sm text-neutral-500 mt-1">{t.subtitle}</div>}
              <div className="mt-3 flex gap-3 text-xs text-neutral-400">
                <span>{t.quiz.length} שאלות</span>
                {t.matchingGame && <span>· משחק התאמה</span>}
                {t.molecules?.length ? <span>· {t.molecules.length} מודלים 3D</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
