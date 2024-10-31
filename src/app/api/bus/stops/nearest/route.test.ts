import { describe, test, expect } from "@jest/globals";
import { GET } from "./route";
import { NextRequest } from "next/server";

describe("/api/bus/stops/nearest", () => {
  test("that the api returns status 200", async () => {
    const request = new NextRequest("https://www.test.com/api/bus/stops?latitude=0&longitude=0", {});
    const response = await GET(request);

    expect(response.status).toBe(200);
  }, 10000);
});
