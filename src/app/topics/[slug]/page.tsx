import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, getTopic } from "@/content/topics";
import { TopicPageView } from "@/components/TopicPage";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return { title: topic ? `${topic.title} - הכנה למבחן בכימיה אורגנית` : "נושא לא נמצא" };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <TopicPageView topic={topic} />;
}
