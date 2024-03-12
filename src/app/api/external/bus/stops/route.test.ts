import { describe, test, expect } from "@jest/globals";
import { GET } from "./route";

describe("/api/external/bus/stops", () => {
  test("returns success", async () => {
    const response = await GET();

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);

    const responseData: { success: boolean } = await response.json();

    expect(typeof responseData).toBe("object");
    expect(responseData).toHaveProperty("success");
    expect(responseData.success).toBeTruthy();
  });
});
