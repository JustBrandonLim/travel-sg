/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "whatwg-fetch";
import { useSearchParams } from "next/navigation";
import BusArrivalsPage from "./page";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: jest.fn(),
}));

describe("/bus/arrivals", () => {
  test("that the page is rendered", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        switch (key) {
          case "name":
            return "Test Bus Stop";
          case "code":
            return "12345";
          case "road":
            return "Test Road";
          default:
            return null;
        }
      },
    });

    render(<BusArrivalsPage />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  }, 10000);
});
