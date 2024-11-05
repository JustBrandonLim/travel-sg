import { BusArrivalAnalysis } from "@interfaces/travel-sg";
import { GetBusArrivalAnalysis, GetBusStopBusArrivalAnalysis } from "@services/travel-sg";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    console.info("[api/bus/arrivals/analysis]: GET()");

    const code = String(request.nextUrl.searchParams.get("code"));

    console.info("[api/bus/arrivals/analysis]: Getting BusStopBusArrivalAnalysis from TravelSG");

    let busArrivalAnalysis: BusArrivalAnalysis[] = [];

    if (code === "all") {
      busArrivalAnalysis = await GetBusArrivalAnalysis();
    } else {
      busArrivalAnalysis = await GetBusStopBusArrivalAnalysis(code);
    }

    return NextResponse.json(busArrivalAnalysis, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
