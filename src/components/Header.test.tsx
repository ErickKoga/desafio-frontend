import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  it("should render the logo", () => {
    render(<Header />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });
});
