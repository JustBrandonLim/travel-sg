import { BusRoute } from "@interfaces/travel-sg";
import { GetBusRoutes } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busRoutes: BusRoute[] = await GetBusRoutes();

  return NextResponse.json(busRoutes, { status: 200 });
}
