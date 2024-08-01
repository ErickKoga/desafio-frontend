import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Home from "./Home";

vi.mock("../stores/useStocks", () => ({
  __esModule: true,
  default: () => ({
    stocks: [
      {
        symbol: "AAPL",
        price: 150,
        direction: "up",
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 160, timestamp: expect.any(Number) },
        ],
      },
      {
        symbol: "GOOG",
        price: 280,
        direction: "down",
        history: [
          { price: 280, timestamp: expect.any(Number) },
          { price: 290, timestamp: expect.any(Number) },
        ],
      },
      {
        symbol: "AMZN",
        price: 330,
        direction: "none",
        history: [
          { price: 330, timestamp: expect.any(Number) },
          { price: 320, timestamp: expect.any(Number) },
        ],
      },
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
