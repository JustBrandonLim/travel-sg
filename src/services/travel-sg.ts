import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import { db } from "@vercel/postgres";

export async function UpsertBusStops(busStops: BusStop[]) {
  const client = await db.connect();

  for (const busStop of busStops) {
    // cannot use forEach, no async support

    try {
      await client.sql`
              INSERT INTO bus_stop(code, name, road, latitude, longitude)
              VALUES (${busStop.code}, ${busStop.name}, ${busStop.road}, ${busStop.latitude}, ${busStop.longitude})
              ON CONFLICT (code)
              DO UPDATE
              SET name = EXCLUDED.name, road = EXCLUDED.road, latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude;
            `;
    } catch (exception) {
      console.log(exception);

      console.log(
        "%s, %s, %s, %s, %s",
        busStop.code,
        busStop.name,
        busStop.road,
        busStop.latitude,
        busStop.longitude
      );
    }
  }
}

export async function UpsertBusServices(busServices: BusService[]) {
  const client = await db.connect();

  for (const busService of busServices) {
    // cannot use forEach, no async support

    try {
      await client.sql`
              INSERT INTO bus_service(number, origin_code, destination_code, operator, direction)
              VALUES (${busService.number}, ${busService.originCode}, ${busService.destinationCode}, ${busService.operator}, ${busService.direction})
              ON CONFLICT (number)
              DO UPDATE
              SET destination_code = EXCLUDED.destination_code, operator = EXCLUDED.operator, direction = EXCLUDED.direction;
            `;
    } catch (exception) {
      console.log(exception);

      console.log(
        "%s, %s, %s, %s, %s",
        busService.number,
        busService.originCode,
        busService.destinationCode,
        busService.operator,
        busService.direction
      );
    }
  }
}

export async function UpsertBusRoutes(busRoutes: BusRoute[]) {
  const client = await db.connect();

  for (const busRoute of busRoutes) {
    // cannot use forEach, no async support

    try {
      await client.sql`
              INSERT INTO bus_route(code, number, sequence)
              VALUES (${busRoute.code}, ${busRoute.number}, ${busRoute.sequence})
              ON CONFLICT (code, number)
              DO UPDATE
              SET sequence = EXCLUDED.sequence;
            `;
    } catch (exception) {
      console.log(exception);

      console.log(
        "%s, %s, %s, %s, %s",
        busRoute.code,
        busRoute.number,
        busRoute.sequence
      );
    }
  }
}

export async function GetBusStops() {
  //let busStops: BusStop[] = [];

  const client = await db.connect();

  try {
    console.log(
      await client.sql`SELECT code, name, road, latitude, longitude FROM bus_stop;`
    );
  } catch (exception) {}
}
