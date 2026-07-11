import type { Metadata } from "next";
import { SimulationsPageView } from "@/components/SimulationsPageView";

export const metadata: Metadata = {
  title: "סימולציות מנגנון תלת-ממדיות - הכנה למבחן בכימיה אורגנית",
};

export default function SimulationsPage() {
  return <SimulationsPageView />;
}
