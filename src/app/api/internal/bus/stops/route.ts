import { NextResponse } from "next/server";
import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/travel-sg";

export async function GET() {
  //let busStops: BusStop[] = await GetBusStops();

  // store data here!

  await GetBusStops();

  return NextResponse.json({ message: "" }, { status: 200 });
}
