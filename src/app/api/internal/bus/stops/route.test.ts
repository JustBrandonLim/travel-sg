import { describe, test, expect } from "@jest/globals";
import { GET } from "./route";
import { BusStop } from "@interfaces/travel-sg";

describe("/api/internal/bus/stops", () => {
  test("returns a list of bus stops", async () => {
    const response = await GET();

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const responseData: BusStop[] = await response.json();

    expect(typeof responseData).toBe("object");
    expect(responseData.length).toBeGreaterThan(0);
    expect(responseData[0]).toHaveProperty("code");
    expect(responseData[0]).toHaveProperty("name");
    expect(responseData[0]).toHaveProperty("road");
    expect(responseData[0]).toHaveProperty("latitude");
    expect(responseData[0]).toHaveProperty("longitude");
  });
});
