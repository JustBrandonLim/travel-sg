import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/lta-datamall";
//import { UpsertBusStops } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const busStops = await GetBusStops();
  const filteredBusStops = FilterBusStops(busStops);

  const;

  /*let busStops: BusStop[] = await GetBusStops();

  let filteredBusStops: BusStop[] = await FilterBusStops(busStops);

  const deleteSuccess = await DeleteBusStops();

  const insertSuccess = await InsertBusStops(filteredBusStops);

  return NextResponse.json({ deleteSuccess: deleteSuccess, insertSuccess: insertSuccess }, { status: 200 });*/

  return NextResponse.json({ message: busStops.length }, { status: 200 });
}
