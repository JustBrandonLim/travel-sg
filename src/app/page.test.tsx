/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("/", () => {
  test("that the page is rendered", async () => {
    render(<HomePage />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  }, 10000);
});
