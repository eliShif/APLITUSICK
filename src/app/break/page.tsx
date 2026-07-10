import type { Metadata } from "next";
import { BreakClient } from "./BreakClient";

export const metadata: Metadata = {
  title: "הפסקת התרעננות - הכנה למבחן בכימיה אורגנית",
};

export default function BreakPage() {
  return <BreakClient />;
}
