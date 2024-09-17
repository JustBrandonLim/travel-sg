"use client";

import { useState, useEffect } from "react";
import { BusStop, BusService, BusRoute } from "@interfaces/travel-sg";
import BusStopCard from "@components/database/bus-stop-card";
import BusServiceCard from "@components/database/bus-service-card";
import BusRouteCard from "@components/database/bus-route-card";

export const runtime = "edge";

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showBusStopSearchResults, setShowBusStopSearchResults] = useState<boolean>(false);
  const [showBusServiceSearchResults, setShowBusServiceSearchResults] = useState<boolean>(false);
  const [showBusRouteSearchResults, setShowBusRouteSearchResults] = useState<boolean>(false);

  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [busServices, setBusServices] = useState<BusService[]>([]);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  useEffect(() => {
    if (busStops.length === 0) {
      (async () => {
        const busStopsResponse = await fetch(`/api/bus/stops`, { cache: "no-store" });
        const busStopsResponseData: BusStop[] = await busStopsResponse.json();

        setBusStops(busStopsResponseData);
      })();
    }

    if (busServices.length === 0) {
      (async () => {
        const busServicesResponse = await fetch(`/api/bus/services`, { cache: "no-store" });
        const busServicesResponseData: BusService[] = await busServicesResponse.json();

        setBusServices(busServicesResponseData);
      })();
    }

    if (busRoutes.length === 0) {
      (async () => {
        const busRoutesResponse = await fetch(`/api/bus/routes`, { cache: "no-store" });
        const busRoutesResponseData: BusRoute[] = await busRoutesResponse.json();

        setBusRoutes(busRoutesResponseData);
      })();
    }
  }, []);

  return (
    <main className="p-3 bg-neutral-300 rounded-md grow overflow-y-scroll flex flex-col gap-3">
      <div className="bg-white rounded-md p-3 flex flex-col gap-3">
        <input
          type="search"
          placeholder="Search for anything..."
          onChange={(event) => setSearchQuery(event.target.value)}
          className="rounded-md w-full p-3 outline-none border border-neutral-300"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setShowBusStopSearchResults(!showBusStopSearchResults)}
            className={`p-3 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md ${
              showBusStopSearchResults && `bg-neutral-300`
            }`}>
            Bus Stops
          </button>
          <button
            onClick={() => setShowBusServiceSearchResults(!showBusServiceSearchResults)}
            className={`p-3 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md ${
              showBusServiceSearchResults && `bg-neutral-300`
            }`}>
            Bus Services
          </button>
          <button
            onClick={() => setShowBusRouteSearchResults(!showBusRouteSearchResults)}
            className={`p-3 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md ${
              showBusRouteSearchResults && `bg-neutral-300`
            }`}>
            Bus Routes
          </button>
        </div>
      </div>
      {showBusStopSearchResults &&
        searchQuery.length > 0 &&
        busStops
          .filter((busStop) => {
            return (
              busStop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              busStop.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              busStop.road.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((busStop, index) => {
            return (
              <BusStopCard
                key={index}
                code={busStop.code}
                name={busStop.name}
                road={busStop.road}
                latitude={busStop.latitude}
                longitude={busStop.longitude}
              />
            );
          })}
      {showBusServiceSearchResults &&
        searchQuery.length > 0 &&
        busServices
          .filter((busServices) => {
            return (
              busServices.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
              busServices.originCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
              busServices.destinationCode.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((busService, index) => {
            return (
              <BusServiceCard
                key={index}
                number={busService.number}
                originCode={busService.originCode}
                destinationCode={busService.destinationCode}
                operator={busService.operator}
                direction={busService.direction}
              />
            );
          })}

      {showBusRouteSearchResults &&
        searchQuery.length > 0 &&
        busRoutes
          .filter((busRoutes) => {
            return (
              busRoutes.code.toLowerCase().includes(searchQuery.toLowerCase()) || busRoutes.number.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((busRoute, index) => {
            return <BusRouteCard key={index} code={busRoute.code} number={busRoute.number} sequence={busRoute.sequence} />;
          })}
    </main>
  );
}
