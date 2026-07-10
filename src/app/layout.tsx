import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "הכנה למבחן - כימיה אורגנית",
  description: "אתר סיכומים, שאלונים, משחקי התאמה ומודלים תלת-ממדיים לקראת מבחן בכימיה אורגנית",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
