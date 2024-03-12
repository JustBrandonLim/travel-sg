import { BusRoute } from "@interfaces/travel-sg";
import { GetBusRoutes } from "@services/lta-datamall";
import { UpsertBusRoutes } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busRoutes: BusRoute[] = await GetBusRoutes();

  const success = await UpsertBusRoutes(busRoutes);

  return NextResponse.json({ success: success }, { status: 200 });
}
