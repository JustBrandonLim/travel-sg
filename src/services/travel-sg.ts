import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import { sql } from "@vercel/postgres";

/**
 * This function takes in fetched and transformed BusStops, to filter and store the data into TravelSG's database.
 *
 * @param busStops
 *
 * @throws exception if error
 * @returns inserted BusStops if success
 */
export async function InsertBusStops(busStops: BusStop[]): Promise<BusStop[]> {
  try {
    console.info("[services/travel-sg]: InsertBusStops()");

    /* Filter */
    // 1. Filter out bus stops that have duplicate code, discarded
    busStops = busStops.filter((busStop, index) => {
      return index === busStops.findIndex((anotherBusStop) => busStop.code === anotherBusStop.code);
    });

    /* Store */
    await sql`
      TRUNCATE "bus_stop" CASCADE;
    `;

    await sql`
      INSERT INTO "bus_stop"("code", "name", "road", "latitude", "longitude")
      SELECT "code", "name", "road", "latitude", "longitude" FROM json_to_recordset(${JSON.stringify(
        busStops
      )}) AS "bus_stop"("code" VARCHAR(5), "name" VARCHAR(255), "road" VARCHAR(255), "latitude" NUMERIC(17, 14), "longitude" NUMERIC(17, 14));
    `;

    return busStops;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

/**
 * This function takes in inserted BusStops, fetched and transformed BusServices, to filter and store the data into TravelSG's database.
 *
 * @param busStops
 * @param busServices
 *
 * @throws exception if error
 * @returns inserted BusServices if success
 */
export async function InsertBusServices(busStops: BusStop[], busServices: BusService[]): Promise<BusService[]> {
  try {
    console.info("[services/travel-sg]: InsertBusServices()");

    /* Filter */
    // 1. Filter out bus services that are loops, but have mismatch origin and destinations, discarded
    busServices = busServices.filter(
      (busService) =>
        (busService.direction === 1 && busService.originCode === busService.destinationCode) ||
        (busService.direction === 2 && busService.originCode !== busService.destinationCode)
    );

    // 2. Filter out bus services that have duplicate number, discarded
    busServices = busServices.filter((busService, index) => {
      return index === busServices.findIndex((anotherBusService) => busService.number === anotherBusService.number);
    });

    /* Store */
    await sql`
      TRUNCATE "bus_service" CASCADE;
    `;

    await sql`
      INSERT INTO "bus_service"("number", "origin_code", "destination_code", "operator", "direction")
      SELECT "number", "originCode" AS "origin_code", "destinationCode" AS "destination_code", "operator", "direction" FROM json_to_recordset(${JSON.stringify(
        busServices
      )}) AS "bus_service"("number" VARCHAR(4), "originCode" VARCHAR(5), "destinationCode" VARCHAR(5), "operator" VARCHAR(4), "direction" NUMERIC(1));
    `;

    return busServices;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

/**
 * This function takes in inserted BusStops, inserted BusServices, fetched and transformed BusRoutes, to filter and store the data into TravelSG's database.
 *
 * @param busStops
 * @param busServices
 * @param busRoutes
 *
 * @throws exception if error
 * @returns inserted BusRoutes if success
 */
export async function InsertBusRoutes(busStops: BusStop[], busServices: BusService[], busRoutes: BusRoute[]): Promise<BusRoute[]> {
  try {
    console.info("[services/travel-sg]: InsertBusRoutes()");

    /* Filter */
    // 1. Filter out bus routes that do not have a valid code or number, discarded
    busRoutes = busRoutes.filter((busRoute) => {
      return busStops.find((busStop) => busStop.code === busRoute.code) && busServices.find((busService) => busService.number === busRoute.number);
    });

    // 2. Filter out bus routes that have duplicate code and number, discarded
    busRoutes = busRoutes.filter((busRoute, index) => {
      return index === busRoutes.findIndex((anotherBusRoute) => busRoute.code === anotherBusRoute.code && busRoute.number === anotherBusRoute.number);
    });

    /* Store */
    await sql`
      TRUNCATE "bus_route" CASCADE;
    `;

    await sql`
      INSERT INTO "bus_route"("code", "number", "sequence")
      SELECT "code", "number", "sequence" FROM json_to_recordset(${JSON.stringify(
        busRoutes
      )}) AS "bus_route"("code" VARCHAR(5), "number" VARCHAR(4), "sequence" NUMERIC(3))
    `;

    return busRoutes;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

export async function GetBusStops(): Promise<BusStop[]> {
  try {
    console.info("[services/travel-sg]: GetBusStops()");

    const busStopsResponseData = await sql`
      SELECT "code", "name", "road", "latitude", "longitude" FROM "bus_stop";
    `;

    return busStopsResponseData.rows as BusStop[];
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

export async function GetBusServices(): Promise<BusService[]> {
  try {
    console.info("[services/travel-sg]: GetBusServices()");

    const busServicesResponseData = await sql`
      SELECT "number", "origin_code" AS "originCode", "destination_code" AS "destinationCode", "operator", "direction" 
      FROM "bus_service";
    `;

    return busServicesResponseData.rows as BusService[];
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

export async function GetBusRoutes(): Promise<BusRoute[]> {
  try {
    console.info("[services/travel-sg]: GetBusRoutes()");

    const busRoutesResponseData = await sql`
      SELECT "code", "number", "sequence" FROM "bus_route";
    `;

    return busRoutesResponseData.rows as BusRoute[];
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}
