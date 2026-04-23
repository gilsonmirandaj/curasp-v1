import { NextResponse } from "next/server";
import { getFilteredEvents } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const events = await getFilteredEvents(searchParams);
  return NextResponse.json({ count: events.length, events });
}
