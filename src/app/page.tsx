"use client";

import { useState } from "react";
import { BusStop } from "@interfaces/travel-sg";

export const runtime = "edge";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [busStops, setBusStops] = useState<BusStop[]>([]);

  const [timeTaken, setTimeTaken] = useState<number>(-1);

  async function handleClick() {
    setLoading(true);

    let startTime = Date.now();

    const response = await fetch("/api/internal/bus/stops", {
      method: "GET",
    });

    const data: BusStop[] = await response.json();

    console.log(data);

    let endTime = Date.now();

    setBusStops(data);

    setTimeTaken(endTime - startTime);

    setLoading(false);
  }

  return (
    <main className="m-5">
      <h1 className="font-bold text-xl mb-10">Bus Stops</h1>
      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5 mb-10">
        <p>Input</p>
        <button
          className="border border-black p-2 bg-blue-500 text-white rounded-md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Loading" : "Fetch Bus Stops"}
        </button>
      </div>

      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5">
        <p>
          Output{" "}
          {busStops.length > 0 && timeTaken !== -1 && (
            <span>
              (Fetched {busStops.length} records in {timeTaken} ms.)
            </span>
          )}
        </p>
        {busStops.length > 0 &&
          busStops.map((busStop) => (
            <div className="flex gap-5" key={busStop.code}>
              <p>{busStop.code}</p>
              <p>{busStop.name}</p>
              <p>{busStop.road}</p>
              <p>{busStop.latitude}</p>
              <p>{busStop.longitude}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
