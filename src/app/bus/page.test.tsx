/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "whatwg-fetch";
import BusPage from "./page";

Object.defineProperty(navigator, "geolocation", {
  value: {
    getCurrentPosition: jest.fn(),
  },
});

describe("/bus", () => {
  test("that the page is rendered", async () => {
    (global.navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce((success) =>
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      })
    );

    render(<BusPage />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  }, 10000);
});
