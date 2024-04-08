import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import { BusStopsResponseData, BusServicesResponseData, BusRoutesResponseData } from "@interfaces/lta-datamall";

/**
 * This function invokes LTA's DataMall API for BusStops, to fetch and transform the data into TravelSG's format, and returns it.
 *
 * @throws exception if error
 * @returns transformed BusStops if success
 */
export async function GetBusStops(): Promise<BusStop[]> {
  try {
    console.info("[services/lta-datamall]: GetBusStops()");

    let busStops: BusStop[] = [];
    let skipCount: number = 0;

    while (true) {
      const busStopsResponse: Response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skipCount}`, {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      });

      const busStopsResponseData: BusStopsResponseData = await busStopsResponse.json();

      let busStopsResponseDataLength: number = busStopsResponseData.value.length;

      if (busStopsResponseDataLength !== 0) {
        busStops = busStops.concat(
          busStopsResponseData.value.map((busStop) => {
            return {
              code: busStop.BusStopCode,
              name: busStop.Description,
              road: busStop.RoadName,
              latitude: busStop.Latitude,
              longitude: busStop.Longitude,
            };
          })
        );

        skipCount += 500;
      }

      if (busStopsResponseDataLength !== 500) {
        break;
      }
    }

    return busStops;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

/**
 * This function invokes LTA's DataMall API for BusServices, to fetch and transform the data into TravelSG's format, and returns it.
 *
 * @throws exception if error
 * @returns transformed BusServices if success
 */
export async function GetBusServices(): Promise<BusService[]> {
  try {
    console.info("[services/lta-datamall]: GetBusServices()");

    let busServices: BusService[] = [];
    let skipCount: number = 0;

    while (true) {
      const busServicesResponse: Response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusServices?$skip=${skipCount}`, {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      });

      const busServicesResponseData: BusServicesResponseData = await busServicesResponse.json();

      let busServicesResponseDataLength: number = busServicesResponseData.value.length;

      if (busServicesResponseDataLength !== 0) {
        busServices = busServices.concat(
          busServicesResponseData.value.map((busService) => {
            return {
              number: busService.ServiceNo,
              originCode: busService.OriginCode,
              destinationCode: busService.DestinationCode,
              operator: busService.Operator,
              direction: busService.Direction,
            };
          })
        );

        skipCount += 500;
      }

      if (busServicesResponseDataLength !== 500) {
        break;
      }
    }

    return busServices;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}

/**
 * This function invokes LTA's DataMall API for BusRoutes, to fetch and transform the data into TravelSG's format, and returns it.
 *
 * @throws exception if error
 * @returns transformed BusRoutes if success
 */
export async function GetBusRoutes(): Promise<BusRoute[]> {
  try {
    console.info("[services/lta-datamall]: GetBusRoutes()");

    let busRoutes: BusRoute[] = [];
    let skipCount: number = 0;

    while (true) {
      const busRoutesResponse: Response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skipCount}`, {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      });

      const busRoutesResponseData: BusRoutesResponseData = await busRoutesResponse.json();

      let busRoutesResponseDataLength: number = busRoutesResponseData.value.length;

      if (busRoutesResponseDataLength !== 0) {
        busRoutes = busRoutes.concat(
          busRoutesResponseData.value.map((busRoute) => {
            return {
              code: busRoute.BusStopCode,
              number: busRoute.ServiceNo,
              sequence: busRoute.StopSequence,
            };
          })
        );

        skipCount += 500;
      }

      if (busRoutesResponseDataLength !== 500) {
        break;
      }
    }

    return busRoutes;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}
