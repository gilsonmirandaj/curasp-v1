import { NextResponse } from "next/server";
import { getGenreOptions } from "@/lib/data";

export async function GET() {
  const genres = await getGenreOptions();
  return NextResponse.json({ count: genres.length, genres });
}
