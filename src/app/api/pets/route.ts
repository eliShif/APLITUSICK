interface PetImage {
  id: string;
  url: string;
  kind: "dog" | "cat";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") === "cat" ? "cat" : "dog";
  const count = Math.min(Math.max(Number(searchParams.get("count")) || 6, 1), 20);

  let images: PetImage[] = [];

  try {
    if (kind === "dog") {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`, {
        cache: "no-store",
      });
      const data: { message: string[] } = await res.json();
      images = (data.message ?? []).map((url) => ({ id: url, url, kind: "dog" as const }));
    } else {
      const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {
        cache: "no-store",
      });
      const data: { id: string; url: string }[] = await res.json();
      images = data.map((c) => ({ id: c.id, url: c.url, kind: "cat" as const }));
    }
  } catch {
    return Response.json({ images: [] }, { status: 502 });
  }

  return Response.json({ images });
}
