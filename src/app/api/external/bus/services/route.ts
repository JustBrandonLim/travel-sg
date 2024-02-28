import { BusService } from "@interfaces/travel-sg";
import { GetBusServices } from "@services/lta-datamall";
import { UpsertBusServices } from "@services/travel-sg";
import { NextResponse } from "next/server";

export async function GET() {
  let busServices: BusService[] = await GetBusServices();

  await UpsertBusServices(busServices);

  return NextResponse.json(busServices, { status: 200 });
}
