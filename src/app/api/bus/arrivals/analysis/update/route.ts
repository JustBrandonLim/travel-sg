import { InsertBusArrivalAnalysis } from "@services/travel-sg";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.info("[api/bus/arrivals/analysis/update]: POST()");

    console.info("[api/bus/arrivals/analysis/update]: Inserting BusArrivalAnalysis to TravelSG");
    await InsertBusArrivalAnalysis();

    return NextResponse.json({ message: "Inserted BusArrivalAnalysis to TravelSG." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
