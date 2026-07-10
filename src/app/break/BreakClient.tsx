"use client";

import dynamic from "next/dynamic";

const RefreshBreak = dynamic(
  () => import("@/components/RefreshBreak").then((m) => m.RefreshBreak),
  { ssr: false }
);

export function BreakClient() {
  return <RefreshBreak />;
}
