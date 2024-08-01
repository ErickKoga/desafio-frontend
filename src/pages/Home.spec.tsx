import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Home from "./Home";

vi.mock("../stores/useStocks", () => ({
  __esModule: true,
  default: () => ({
    stocks: [
      { symbol: "AAPL", price: 150, direction: "up" },
      { symbol: "GOOG", price: 2800, direction: "down" },
      { symbol: "AMZN", price: 3300, direction: "none" },
    ],
  }),
}));

describe("Home Component", () => {
  it("should render stock cards correctly", () => {
    render(<Home />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOG")).toBeInTheDocument();
    expect(screen.getByText("AMZN")).toBeInTheDocument();
  });
});
