import { BusService } from "@interfaces/travel-sg";
import { GetBusServices } from "@services/lta-datamall";
import { UpsertBusServices } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let busServices: BusService[] = await GetBusServices();

  const success = await UpsertBusServices(busServices);

  return NextResponse.json({ success: success }, { status: 200 });
}
