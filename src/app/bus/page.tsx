"use client";

import { useState, useEffect } from "react";
import SkeletonCard from "@components/common/skeleton-card";
import { BusStop } from "@interfaces/travel-sg";
import BusStopCard from "@components/bus/bus-stop-card";

export const runtime = "edge";

export default function BusPage() {
  const [ready, setReady] = useState<boolean>(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>();
  const [busStops, setBusStops] = useState<BusStop[]>([]);

  useEffect(() => {
    if (ready || location || busStops.length > 0) return;

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      function (positionError) {
        setLocation({ latitude: 1.3521, longitude: 103.8198 });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (ready || !location || busStops.length > 0) return;

    (async () => {
      const nearestBusStopsResponse = await fetch(`/api/bus/stops/nearest?latitude=${location.latitude}&longitude=${location.longitude}`, {
        cache: "no-store",
      });
      const nearestBusStopsResponseData: BusStop[] = await nearestBusStopsResponse.json();

      setBusStops(nearestBusStopsResponseData);
      setReady(true);
    })();
  }, [location]);

  return (
    <main className="p-3 bg-neutral-300 rounded-md grow overflow-y-scroll flex flex-col gap-3">
      {!ready && (
        <>
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </>
      )}

      {ready &&
        busStops.map((busStop, index) => {
          return <BusStopCard key={index} code={busStop.code} name={busStop.name} road={busStop.road} />;
        })}
    </main>
  );
}
