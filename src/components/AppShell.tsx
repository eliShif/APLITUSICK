"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { topics } from "@/content/topics";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 overflow-y-auto p-3">
      <Link
        href="/"
        onClick={onNavigate}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          pathname === "/" ? "bg-emerald-600 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        🏠 עמוד הבית
      </Link>

      <div className="mt-2 mb-1 px-3 text-xs font-semibold text-neutral-400">נושאי לימוד</div>
      {topics.map((t) => {
        const href = `/topics/${t.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={t.slug}
            href={href}
            onClick={onNavigate}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              active ? "bg-emerald-600 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {t.icon} {t.title}
          </Link>
        );
      })}

      <div className="mt-3 border-t border-black/10 dark:border-white/10 pt-3">
        <Link
          href="/break"
          onClick={onNavigate}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            pathname === "/break" ? "bg-emerald-600 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
          }`}
        >
          🐶🐱 הפסקת התרעננות
        </Link>
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full">
      {/* תפריט צד קבוע במחשב/טאבלט לרוחב, מגירה נגררת במובייל/טאבלט לאורך */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-72 border-black/10 bg-white transition-transform duration-200 dark:border-white/10 dark:bg-neutral-900 lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-l ${
          open ? "translate-x-0 shadow-2xl" : "translate-x-full"
        } lg:shadow-none`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
          <span className="font-bold">🧪 כימיה אורגנית</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1 text-lg leading-none hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
            aria-label="סגור תפריט"
          >
            ✕
          </button>
        </div>
        <NavLinks onNavigate={() => setOpen(false)} />
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-neutral-950/90 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="פתח תפריט"
          >
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
          <span className="font-bold">🧪 כימיה אורגנית</span>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
