/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "whatwg-fetch";
import DatabasePage from "./page";

describe("/database", () => {
  test("that the page is rendered", async () => {
    render(<DatabasePage />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  }, 10000);
});
