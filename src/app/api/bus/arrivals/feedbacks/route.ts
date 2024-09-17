import { BusArrivalFeedback } from "@interfaces/travel-sg";
import { InsertBusArrivalFeedback } from "@services/travel-sg";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    console.info("[api/bus/arrivals/feedbacks]: POST()");

    const busArrivalFeedback: BusArrivalFeedback = await request.json();

    console.info("[api/bus/arrivals/feedbacks]: Inserting BusArrivalFeedback to TravelSG");
    await InsertBusArrivalFeedback(busArrivalFeedback.code, busArrivalFeedback.number, busArrivalFeedback.content);

    return NextResponse.json({ message: "Inserted BusArrivalFeedback to TravelSG." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
