import { BusArrival } from "@interfaces/travel-sg";
import { GetBusArrivals } from "@services/lta-datamall";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    console.info("[api/bus/arrivals]: GET()");

    const code = String(request.nextUrl.searchParams.get("code"));

    console.info("[api/bus/arrivals]: Getting BusArrivals from LTA");
    const busArrivals: BusArrival[] = await GetBusArrivals(code);

    //console.info("[api/bus/arrivals]: Getting BusArrivals from TravelSG");
    //const busArrivalsTravelSG: BusArrival[] = await GetBusArrivalsTravelSG(code);

    //console.info("[api/bus/arrivals]: Merging BusArrivals");

    return NextResponse.json(busArrivals, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
