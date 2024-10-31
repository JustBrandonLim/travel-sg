import { describe, test, expect } from "@jest/globals";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("/api/bus/arrivals/feedback", () => {
  test("that the api returns status 200", async () => {
    const request = new NextRequest("https://www.test.com/api/bus/arrivals/feedback", {
      method: "POST",
      body: JSON.stringify({ code: "10169", number: "16", content: "Good." }),
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
  }, 10000);
});
