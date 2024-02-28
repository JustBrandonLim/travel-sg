import { BusRoute } from "@interfaces/travel-sg";
import { GetBusRoutes } from "@services/lta-datamall";
import { UpsertBusRoutes } from "@services/travel-sg";
import { NextResponse } from "next/server";

export async function GET() {
  let busRoutes: BusRoute[] = await GetBusRoutes();

  await UpsertBusRoutes(busRoutes);

  return NextResponse.json(busRoutes, { status: 200 });
}
