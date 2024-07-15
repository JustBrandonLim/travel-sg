import { BusStop } from "@interfaces/travel-sg";
import { GetBusStops } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    console.info("[api/bus/stops]: GET()");

    console.info("[api/bus/stops]: Getting BusStops from TravelSG");
    const busStops: BusStop[] = await GetBusStops();

    return NextResponse.json(busStops, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
