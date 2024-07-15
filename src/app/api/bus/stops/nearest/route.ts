import { BusStop } from "@interfaces/travel-sg";
import { GetNearestBusStops } from "@services/travel-sg";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    console.info("[api/bus/stops/nearest]: GET()");

    const latitude = Number(request.nextUrl.searchParams.get("latitude"));
    const longitude = Number(request.nextUrl.searchParams.get("longitude"));

    console.info("[api/bus/stops/nearest]: Getting NearestBusStops from TravelSG");
    const nearestBusStops: BusStop[] = await GetNearestBusStops({ latitude: latitude, longitude: longitude });

    return NextResponse.json(nearestBusStops, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
