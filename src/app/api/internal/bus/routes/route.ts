import { BusRoute } from "@interfaces/travel-sg";
import { GetBusRoutes } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    console.info("[api/internal/bus/routes]: GET()");

    console.info("[api/internal/bus/routes]: Getting BusRoutes from TravelSG");
    const busRoutes: BusRoute[] = await GetBusRoutes();

    return NextResponse.json(busRoutes, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
