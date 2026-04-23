import { NextResponse } from "next/server";
import { getVenueOptions } from "@/lib/data";

export async function GET() {
  const venues = await getVenueOptions();
  return NextResponse.json({ count: venues.length, venues });
}
