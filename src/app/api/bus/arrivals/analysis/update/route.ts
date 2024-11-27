import { BusArrivalFeedback } from "@interfaces/travel-sg";
import { GetBusArrivalFeedbacks, InsertBusArrivalAnalysis } from "@services/travel-sg";
import { NextResponse } from "next/server";

//export const runtime = "edge";
export const revalidate = 0;

export async function GET() {
  try {
    console.info("[api/bus/arrivals/analysis/update]: POST()");

    console.info("[api/bus/arrivals/analysis/update]: Getting BusArrivalFeedbacks from TravelSG");
    let busArrivalFeedbacks: BusArrivalFeedback[] = await GetBusArrivalFeedbacks();

    console.info("[api/bus/arrivals/analysis/update]: Inserting BusArrivalAnalysis to TravelSG");
    await InsertBusArrivalAnalysis(busArrivalFeedbacks);

    return NextResponse.json({ message: "Inserted BusArrivalAnalysis to TravelSG." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
