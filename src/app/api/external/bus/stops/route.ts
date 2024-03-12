import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/lta-datamall";
import { UpsertBusStops } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busStops: BusStop[] = await GetBusStops();

  const success = await UpsertBusStops(busStops);

  return NextResponse.json({ success: success }, { status: 200 });
}
