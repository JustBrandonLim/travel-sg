import { BusArrivalFeedback } from "@interfaces/travel-sg";
import { InsertBusArrivalReviewsAnalysis } from "@services/travel-sg";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    console.info("[api/bus/arrivals/reviews/analysis]: POST()");

    await InsertBusArrivalReviewsAnalysis();

    //const busArrivalReview: BusArrivalReview = await request.json();

    //console.info("[api/bus/arrivals/reviews]: Inserting BusArrivalReview to TravelSG");
    //await InsertBusArrivalReview(busArrivalReview.code, busArrivalReview.number, busArrivalReview.content);

    //return NextResponse.json({ message: "Inserted BusArrivalReview to TravelSG." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
