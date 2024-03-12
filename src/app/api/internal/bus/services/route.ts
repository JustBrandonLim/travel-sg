import { BusService } from "@interfaces/travel-sg";
import { GetBusServices } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busServices: BusService[] = await GetBusServices();

  return NextResponse.json(busServices, { status: 200 });
}
