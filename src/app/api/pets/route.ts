interface PetImage {
  id: string;
  url: string;
  kind: "dog" | "cat" | "funny";
  caption?: string;
}

const FUNNY_SUBREDDITS = ["funnyanimals", "AnimalsBeingBros", "AnimalsBeingJerks", "aww"];
const IMAGE_EXT = /\.(jpe?g|png|gif)(\?.*)?$/i;
const NON_CONTENT_TITLE = /community announcement|stance on spam|is now (private|restricted)|moderator|subreddit (rules|update)|megathread/i;

async function fetchDogs(count: number): Promise<PetImage[]> {
  const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`, { cache: "no-store" });
  const data: { message: string[] } = await res.json();
  return (data.message ?? []).map((url) => ({ id: url, url, kind: "dog" as const }));
}

async function fetchCats(count: number): Promise<PetImage[]> {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {
    cache: "no-store",
  });
  const data: { id: string; url: string }[] = await res.json();
  return data.map((c) => ({ id: c.id, url: c.url, kind: "cat" as const }));
}

interface MemePost {
  postLink: string;
  url: string;
  title: string;
  nsfw: boolean;
}

async function fetchFunny(count: number): Promise<PetImage[]> {
  // כל תת-פורום קטן ומחזיר לעיתים מעט תוצאות - שולפים מכולם במקביל ומאגדים
  // כדי להגיע לכמות המבוקשת גם אם חלקם "יבשים" כרגע.
  const results = await Promise.allSettled(
    FUNNY_SUBREDDITS.map(async (sub) => {
      const res = await fetch(`https://meme-api.com/gimme/${sub}/${count}`, { cache: "no-store" });
      if (!res.ok) return [] as MemePost[];
      const data: { memes?: MemePost[] } = await res.json();
      return data.memes ?? [];
    })
  );

  const pool: PetImage[] = [];
  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const m of r.value) {
      if (m.nsfw || !IMAGE_EXT.test(m.url) || NON_CONTENT_TITLE.test(m.title)) continue;
      pool.push({ id: m.postLink, url: m.url, kind: "funny" as const, caption: m.title });
    }
  }

  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kindParam = searchParams.get("kind");
  const kind: "dog" | "cat" | "funny" =
    kindParam === "cat" ? "cat" : kindParam === "funny" ? "funny" : "dog";
  const count = Math.min(Math.max(Number(searchParams.get("count")) || 6, 1), 30);

  let images: PetImage[] = [];

  try {
    if (kind === "dog") images = await fetchDogs(count);
    else if (kind === "cat") images = await fetchCats(count);
    else images = await fetchFunny(count);
  } catch {
    return Response.json({ images: [] }, { status: 502 });
  }

  return Response.json({ images });
}
