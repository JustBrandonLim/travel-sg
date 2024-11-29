/**
 * @jest-environment node
 */

import { GET } from "./route";
import { NextRequest } from "next/server";

describe("/api/bus/arrivals", () => {
  test("that the api returns status 200", async () => {
    const request = new NextRequest("https://test.com/api/bus/arrivals?code=10169", {});
    const response = await GET(request);

    expect(response.status).toBe(200);
  }, 10000);
});
