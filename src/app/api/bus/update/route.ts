import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import { GetBusServices, GetBusStops, GetBusRoutes } from "@services/lta-datamall";
import { InsertBusStops, InsertBusServices, InsertBusRoutes } from "@services/travel-sg";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    console.info("[api/bus/update]: GET()");

    console.info("[api/bus/update]: Getting BusStops from LTA");
    let busStops: BusStop[] = await GetBusStops();

    console.info("[api/bus/update]: Getting BusServices from LTA");
    let busServices: BusService[] = await GetBusServices();

    console.info("[api/bus/update]: Getting BusRoutes from LTA");
    let busRoutes: BusRoute[] = await GetBusRoutes();

    console.info("[api/bus/update]: Inserting BusStops to TravelSG");
    busStops = await InsertBusStops(busStops);

    console.info("[api/bus/update]: Inserting BusServices to TravelSG");
    busServices = await InsertBusServices(busStops, busServices);

    console.info("[api/bus/update]: Inserting BusRoutes to TravelSG");
    busRoutes = await InsertBusRoutes(busStops, busServices, busRoutes);

    return NextResponse.json({ message: "Success." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occurred." }, { status: 500 });
  }
}
