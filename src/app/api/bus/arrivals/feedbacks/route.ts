import { BusArrivalFeedback } from "@interfaces/travel-sg";
import { GetBusArrivalFeedbacks } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    console.info("[api/bus/arrivals/feedbacks]: GET()");

    console.info("[api/bus/arrivals/feedbacks]: Getting BusArrivalFeedbacks from TravelSG");
    const busArrivalFeedbacks: BusArrivalFeedback[] = await GetBusArrivalFeedbacks();

    return NextResponse.json(busArrivalFeedbacks, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
