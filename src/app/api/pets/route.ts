// חובה - בלי זה Next.js עלול להגיש תגובה מטמונה (סטטית) לאותו URL,
// כך שרענון תמונות בפועל היה מחזיר בדיוק את אותן תמונות בכל פעם.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PetImage {
  id: string;
  url: string;
  kind: "dog" | "cat" | "funny";
  caption?: string;
}

const FUNNY_SUBREDDITS = ["funnyanimals", "AnimalsBeingBros", "AnimalsBeingJerks", "aww"];
// רק תמונות סטטיות - gif נטען לאט מדי ופוגע בתחושת המסך המלא
const STATIC_IMAGE_EXT = /\.(jpe?g|png|webp)(\?.*)?$/i;
const NON_CONTENT_TITLE = /community announcement|stance on spam|is now (private|restricted)|moderator|subreddit (rules|update)|megathread/i;

async function fetchDogs(count: number): Promise<PetImage[]> {
  // מבקשים יותר מהדרוש כדי לפצות על סינון גיפים, dog.ceo תומך בכמויות גדולות בלי בעיה
  const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count * 2}`, {
    cache: "no-store",
  });
  const data: { message: string[] } = await res.json();
  return (data.message ?? [])
    .filter((url) => STATIC_IMAGE_EXT.test(url))
    .map((url) => ({ id: url, url, kind: "dog" as const }));
}

async function fetchCats(count: number): Promise<PetImage[]> {
  // ה-API החינמי של thecatapi מחזיר לכל היותר 10 תמונות לבקשה בלי מפתח,
  // בלי קשר ל-limit שמתבקש - לכן שולחים כמה בקשות מקבילות כדי להגיע לכמות הרצויה.
  const batches = Math.max(1, Math.ceil((count * 1.5) / 10));
  const results = await Promise.allSettled(
    Array.from({ length: batches }, () =>
      fetch("https://api.thecatapi.com/v1/images/search?limit=10", { cache: "no-store" }).then(
        (r) => r.json() as Promise<{ id: string; url: string }[]>
      )
    )
  );

  const seen = new Set<string>();
  const pool: PetImage[] = [];
  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const c of r.value) {
      if (seen.has(c.id) || !STATIC_IMAGE_EXT.test(c.url)) continue;
      seen.add(c.id);
      pool.push({ id: c.id, url: c.url, kind: "cat" as const });
    }
  }
  return pool;
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
      const res = await fetch(`https://meme-api.com/gimme/${sub}/${count * 2}`, {
        cache: "no-store",
      });
      if (!res.ok) return [] as MemePost[];
      const data: { memes?: MemePost[] } = await res.json();
      return data.memes ?? [];
    })
  );

  const pool: PetImage[] = [];
  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const m of r.value) {
      if (m.nsfw || !STATIC_IMAGE_EXT.test(m.url) || NON_CONTENT_TITLE.test(m.title)) continue;
      pool.push({ id: m.postLink, url: m.url, kind: "funny" as const, caption: m.title });
    }
  }

  return pool.sort(() => Math.random() - 0.5);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kindParam = searchParams.get("kind");
  const kind: "dog" | "cat" | "funny" =
    kindParam === "cat" ? "cat" : kindParam === "funny" ? "funny" : "dog";
  const count = Math.min(Math.max(Number(searchParams.get("count")) || 6, 1), 40);

  let images: PetImage[] = [];

  try {
    if (kind === "dog") images = await fetchDogs(count);
    else if (kind === "cat") images = await fetchCats(count);
    else images = await fetchFunny(count);
  } catch {
    return Response.json({ images: [] }, { status: 502 });
  }

  return Response.json(
    { images: images.slice(0, count) },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
