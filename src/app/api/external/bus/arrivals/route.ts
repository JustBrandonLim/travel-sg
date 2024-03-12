import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    { message: "Not implemented yet." },
    { status: 501 }
  );
}
