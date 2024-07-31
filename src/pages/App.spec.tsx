import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import setupWebSocket from "../services/quotesWebsocket";
import App from "./App";

vi.mock("../services/quotesWebsocket", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../stores/useStocks", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    stocks: [
      { symbol: "AAPL", price: 150, direction: "up" },
      { symbol: "GOOG", price: 28, direction: "down" },
      { symbol: "AMZN", price: 330, direction: "none" },
    ],
  })),
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render stock prices correctly", () => {
    render(<App />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("R$ 150,00")).toBeInTheDocument();
    expect(screen.getByText("▲")).toBeInTheDocument();

    expect(screen.getByText("GOOG")).toBeInTheDocument();
    expect(screen.getByText("R$ 28,00")).toBeInTheDocument();
    expect(screen.getByText("▼")).toBeInTheDocument();

    expect(screen.getByText("AMZN")).toBeInTheDocument();
    expect(screen.getByText("R$ 330,00")).toBeInTheDocument();
  });

  it("should call setupWebSocket on mount", async () => {
    render(<App />);

    await waitFor(() => {
      expect(setupWebSocket).toHaveBeenCalled();
    });
  });
});
