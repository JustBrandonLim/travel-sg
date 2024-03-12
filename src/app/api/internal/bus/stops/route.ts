import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busStops: BusStop[] = await GetBusStops();

  return NextResponse.json(busStops, { status: 200 });
}
