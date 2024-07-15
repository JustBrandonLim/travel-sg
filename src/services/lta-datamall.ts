import { BusStop, BusService, BusRoute, BusArrival } from "@interfaces/travel-sg";
import { BusStopsResponseData, BusServicesResponseData, BusRoutesResponseData, BusArrivalsResponseData } from "@interfaces/lta-datamall";

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
        cache: "no-store",
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
        cache: "no-store",
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
        cache: "no-store",
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

/**
 * TODO: Need to improve the mapping of this.
 *
 * @param code
 * @returns
 */
export async function GetBusArrivals(code: string): Promise<BusArrival[]> {
  try {
    console.info("[services/lta-datamall]: GetBusArrivals()");

    let busArrivals: BusArrival[] = [];

    const busArrivalsResponse: Response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${code}`, {
      method: "GET",
      headers: {
        AccountKey: process.env["LTA_DATAMALL_ACCOUNT_KEY"] as string,
      },
      cache: "no-store",
    });

    const busArrivalsResponseData: BusArrivalsResponseData = await busArrivalsResponse.json();

    let busArrivalsResponseDataLength: number = busArrivalsResponseData.Services.length;

    if (busArrivalsResponseDataLength !== 0) {
      busArrivals = busArrivals.concat(
        busArrivalsResponseData.Services.map((busArrival) => {
          const firstBusArrival = Math.round((new Date(busArrival.NextBus.EstimatedArrival).getTime() - new Date().getTime()) / 60000);
          const secondBusArrival = Math.round((new Date(busArrival.NextBus2.EstimatedArrival).getTime() - new Date().getTime()) / 60000);
          const thirdBusArrival = Math.round((new Date(busArrival.NextBus3.EstimatedArrival).getTime() - new Date().getTime()) / 60000);

          console.log(busArrival.ServiceNo + " " + busArrival.NextBus3.Load);

          return {
            code: code,
            number: busArrival.ServiceNo,
            arrivals: [
              {
                arrival: isNaN(firstBusArrival)
                  ? "-"
                  : firstBusArrival < 0
                  ? "Left"
                  : firstBusArrival < 1
                  ? "Arrived"
                  : `${firstBusArrival.toString()} minute(s)`,
                load:
                  busArrival.NextBus.Load === ""
                    ? "-"
                    : busArrival.NextBus.Load === "SEA"
                    ? "Low Crowd"
                    : busArrival.NextBus.Load === "SDA"
                    ? "Medium Crowd"
                    : busArrival.NextBus.Load === "LSD"
                    ? "High Crowd"
                    : "-",
                feature:
                  busArrival.NextBus.Feature === "" && isNaN(firstBusArrival)
                    ? "-"
                    : busArrival.NextBus.Feature === "WAB"
                    ? "Wheelchair Accessible"
                    : "Non Wheelchair Accessible",
                type:
                  busArrival.NextBus.Type === ""
                    ? "-"
                    : busArrival.NextBus.Type === "SD"
                    ? "Single Deck Bus"
                    : busArrival.NextBus.Type === "DD"
                    ? "Double Deck Bus"
                    : busArrival.NextBus.Type === "BD"
                    ? "Bendy Bus"
                    : "-",
              },
              {
                arrival: isNaN(secondBusArrival)
                  ? "-"
                  : secondBusArrival < 0
                  ? "Left"
                  : secondBusArrival < 1
                  ? "Arrived"
                  : `${secondBusArrival.toString()} minute(s)`,
                load:
                  busArrival.NextBus2.Load === ""
                    ? "-"
                    : busArrival.NextBus2.Load === "SEA"
                    ? "Low Crowd"
                    : busArrival.NextBus2.Load === "SDA"
                    ? "Medium Crowd"
                    : busArrival.NextBus2.Load === "LSD"
                    ? "High Crowd"
                    : "-",
                feature:
                  busArrival.NextBus2.Feature === "" && isNaN(secondBusArrival)
                    ? "-"
                    : busArrival.NextBus2.Feature === "WAB"
                    ? "Wheelchair Accessible"
                    : "Non Wheelchair Accessible",
                type:
                  busArrival.NextBus2.Type === ""
                    ? "-"
                    : busArrival.NextBus2.Type === "SD"
                    ? "Single Deck Bus"
                    : busArrival.NextBus2.Type === "DD"
                    ? "Double Deck Bus"
                    : busArrival.NextBus2.Type === "BD"
                    ? "Bendy Bus"
                    : "-",
              },
              {
                arrival: isNaN(thirdBusArrival)
                  ? "-"
                  : thirdBusArrival < 0
                  ? "Left"
                  : thirdBusArrival < 1
                  ? "Arrived"
                  : `${thirdBusArrival.toString()} minute(s)`,
                load:
                  busArrival.NextBus3.Load === ""
                    ? "-"
                    : busArrival.NextBus3.Load === "SEA"
                    ? "Low Crowd"
                    : busArrival.NextBus3.Load === "SDA"
                    ? "Medium Crowd"
                    : busArrival.NextBus3.Load === "LSD"
                    ? "High Crowd"
                    : "-",
                feature:
                  busArrival.NextBus3.Feature === "" && isNaN(thirdBusArrival)
                    ? "-"
                    : busArrival.NextBus3.Feature === "WAB"
                    ? "Wheelchair Accessible"
                    : "Non Wheelchair Accessible",
                type:
                  busArrival.NextBus3.Type === ""
                    ? "-"
                    : busArrival.NextBus3.Type === "SD"
                    ? "Single Deck Bus"
                    : busArrival.NextBus3.Type === "DD"
                    ? "Double Deck Bus"
                    : busArrival.NextBus3.Type === "BD"
                    ? "Bendy Bus"
                    : "-",
              },
            ],
          };
        })
      );
    }

    return busArrivals;
  } catch (exception) {
    console.error(exception);

    throw exception;
  }
}
