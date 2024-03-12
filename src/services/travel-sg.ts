import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import { sql } from "@vercel/postgres";

export async function UpsertBusStops(busStops: BusStop[]) {
  busStops = busStops.filter((busStop) => {
    return (
      busStops.findIndex(
        (anotherBusStop) => anotherBusStop.code === busStop.code
      ) === -1 &&
      busStop.code &&
      busStop.name &&
      busStop.road &&
      busStop.latitude &&
      busStop.longitude
    );
  });

  try {
    await sql`
              INSERT INTO "bus_stop"
              SELECT "code", "name", "road", "latitude", "longitude" FROM json_to_recordset(${JSON.stringify(
                busStops
              )}) AS "bus_stop"("code" VARCHAR(5), "name" VARCHAR(255), "road" VARCHAR(255), "latitude" NUMERIC(17, 14), "longitude" NUMERIC(17, 14))
              ON CONFLICT ("code")
              DO UPDATE
              SET "name" = EXCLUDED."name", "road" = EXCLUDED."road", "latitude" = EXCLUDED."latitude", "longitude" = EXCLUDED."longitude";
            `;

    return true;
  } catch (exception) {
    console.log(exception);

    return false;
  }
}

export async function UpsertBusServices(busServices: BusService[]) {
  busServices = busServices.filter((busService) => {
    return (
      busServices.findIndex(
        (anotherBusService) => anotherBusService.number === busService.number
      ) === -1 &&
      busService.number &&
      busService.originCode &&
      busService.destinationCode &&
      busService.operator &&
      busService.direction
    );
  });

  try {
    await sql`
              INSERT INTO "bus_service"("number", "origin_code", "destination_code", "operator", "direction")
              SELECT "number", "originCode" AS "origin_code", "destinationCode" AS "destination_code", "operator", "direction" FROM json_to_recordset(${JSON.stringify(
                busServices
              )}) AS "bus_service"("number" VARCHAR(4), "originCode" VARCHAR(5), "destinationCode" VARCHAR(5), "operator" VARCHAR(4), "direction" NUMERIC(1))
              ON CONFLICT ("number")
              DO UPDATE
              SET "destination_code" = EXCLUDED."destination_code", "operator" = EXCLUDED."operator", "direction" = EXCLUDED."direction";
            `;

    return true;
  } catch (exception) {
    console.log(exception);

    return false;
  }
}

export async function UpsertBusRoutes(busRoutes: BusRoute[]) {
  busRoutes = busRoutes.filter((busRoute) => {
    return (
      busRoutes.findIndex(
        (anotherBusRoute) =>
          anotherBusRoute.code === busRoute.code &&
          anotherBusRoute.number === busRoute.number
      ) === -1 &&
      busRoute.code &&
      busRoute.number &&
      busRoute.sequence
    );
  });

  try {
    await sql`
              INSERT INTO "bus_route"("code", "number", "sequence")
              SELECT "code", "number", "sequence" FROM json_to_recordset(${JSON.stringify(
                busRoutes
              )}) AS "bus_route"("code" VARCHAR(5), "number" VARCHAR(4), "sequence" NUMERIC(3))
              ON CONFLICT ("code", "number")
              DO UPDATE
              SET "sequence" = EXCLUDED."sequence";
            `;

    return true;
  } catch (exception) {
    console.log(exception);

    return false;
  }
}

export async function GetBusStops() {
  let busStops: BusStop[] = [];

  try {
    const busStopsResponseData = await sql`SELECT * FROM bus_stop;`;

    if (busStopsResponseData.rowCount !== 0) {
      busStops = busStopsResponseData.rows as BusStop[];
    }
  } catch (exception) {
    console.log(exception);
  } finally {
    return busStops;
  }
}

export async function GetBusServices() {
  let busServices: BusService[] = [];

  try {
    const busServicesResponseData = await sql`
                SELECT "number", "origin_code" AS "originCode", "destination_code" AS "destinationCode", "operator", "direction" 
                FROM "bus_service";
              `;

    if (busServicesResponseData.rowCount !== 0) {
      busServices = busServicesResponseData.rows as BusService[];
    }
  } catch (exception) {
    console.log(exception);
  } finally {
    return busServices;
  }
}

export async function GetBusRoutes() {
  let busRoutes: BusRoute[] = [];

  try {
    const busRoutesResponseData = await sql`SELECT * FROM bus_route;`;

    if (busRoutesResponseData.rowCount !== 0) {
      busRoutes = busRoutesResponseData.rows as BusRoute[];
    }
  } catch (exception) {
    console.log(exception);
  } finally {
    return busRoutes;
  }
}
