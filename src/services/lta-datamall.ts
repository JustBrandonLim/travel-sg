import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import {
  BusStopsResponseData,
  BusServicesResponseData,
  BusRoutesResponseData,
} from "@interfaces/lta-datamall";

export async function GetBusStops() {
  let busStops: BusStop[] = [];

  let skipCount = 0;

  while (true) {
    const busStopsResponse = await fetch(
      `http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skipCount}`,
      {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      }
    );

    if (busStopsResponse.status !== 200) {
      return busStops;
    }

    const busStopsResponseData: BusStopsResponseData =
      await busStopsResponse.json();

    if (busStopsResponseData.value.length === 0) {
      return busStops;
    }

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
}

export async function GetBusServices() {
  let busServices: BusService[] = [];

  let skipCount = 0;

  while (true) {
    const busServicesResponse = await fetch(
      `http://datamall2.mytransport.sg/ltaodataservice/BusServices?$skip=${skipCount}`,
      {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      }
    );

    if (busServicesResponse.status !== 200) {
      return busServices;
    }

    const busServicesResponseData: BusServicesResponseData =
      await busServicesResponse.json();

    if (busServicesResponseData.value.length === 0) {
      return busServices;
    }

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
}

export async function GetBusRoutes() {
  let busRoutes: BusRoute[] = [];

  let skipCount = 0;

  while (true) {
    const busRoutesResponse = await fetch(
      `http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skipCount}`,
      {
        method: "GET",
        headers: {
          AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
        },
      }
    );

    if (busRoutesResponse.status !== 200) {
      return busRoutes;
    }

    const busRoutesResponseData: BusRoutesResponseData =
      await busRoutesResponse.json();

    if (busRoutesResponseData.value.length === 0) {
      return busRoutes;
    }

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
}
