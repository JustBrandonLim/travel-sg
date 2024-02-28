import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/lta-datamall";
import { UpsertBusStops } from "@services/travel-sg";
import { NextResponse } from "next/server";

export async function GET() {
  let busStops: BusStop[] = await GetBusStops();

  await UpsertBusStops(busStops);

  return NextResponse.json(busStops, { status: 200 });
}
