import { describe, test, expect } from "@jest/globals";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("/api/bus/arrivals/reviews", () => {
  test("that the api returns status 200", async () => {
    const request = new NextRequest("https://www.travelsg.com/api/bus/arrivals/reviews", {
      body: JSON.stringify({ code: "10169", number: "16", content: "Good." }),
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
  }, 10000);
});
