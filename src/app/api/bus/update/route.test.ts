import { describe, test, expect } from "@jest/globals";
import { GET } from "./route";

describe("/api/bus/update", () => {
  test("that the api returns status 200", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  }, 10000);
});
