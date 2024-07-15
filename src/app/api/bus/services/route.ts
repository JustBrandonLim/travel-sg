import { BusService } from "@interfaces/travel-sg";
import { GetBusServices } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    console.info("[api/bus/services]: GET()");

    console.info("[api/bus/services]: Getting BusServices from TravelSG");
    const busServices: BusService[] = await GetBusServices();

    return NextResponse.json(busServices, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
