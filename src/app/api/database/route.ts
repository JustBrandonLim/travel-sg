import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "edge";

export async function POST() {
  try {
    await sql`
              CREATE TABLE IF NOT EXISTS "bus_stop" (
                "code" VARCHAR(5) PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "road" VARCHAR(255) NOT NULL,
                "latitude" NUMERIC(17, 14) NOT NULL,
                "longitude" NUMERIC(17, 14) NOT NULL
              );
              `;

    await sql`
              CREATE TABLE IF NOT EXISTS "bus_service" (
                "number" VARCHAR(4) PRIMARY KEY,
                "origin_code" VARCHAR(5) REFERENCES "bus_stop"("code") ON DELETE CASCADE,
                "destination_code" VARCHAR(5) REFERENCES "bus_stop"("code") ON DELETE CASCADE,
                "operator" VARCHAR(4) NOT NULL,
                "direction" NUMERIC(1) NOT NULL
              );
              `;

    await sql`
              CREATE TABLE IF NOT EXISTS "bus_route" (
                "code" VARCHAR(5) REFERENCES "bus_stop"("code") ON DELETE CASCADE,
                "number" VARCHAR(4) REFERENCES "bus_service"("number") ON DELETE CASCADE,
                "sequence" NUMERIC(3) NOT NULL,
                PRIMARY KEY("code", "number")
              );
              `;

    return NextResponse.json({ message: "Success." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occured." }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await sql`
              DROP TABLE "bus_stop", "bus_service", "bus_route";
              `;

    return NextResponse.json({ message: "Success." }, { status: 200 });
  } catch (exception) {
    console.error(exception);

    return NextResponse.json({ message: "An error has occured." }, { status: 500 });
  }
}
