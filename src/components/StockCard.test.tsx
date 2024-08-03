import StockCard from "@/components/StockCard";
import { Direction, Stock } from "@/models/stock";
import { render, screen } from "@testing-library/react";
import * as Recharts from "recharts";
import { ResponsiveContainerProps } from "recharts";
import { describe, it, vi } from "vitest";

vi.mock("recharts", async () => {
  const originalModule = await import("recharts");

  const original = originalModule as typeof Recharts;

  return {
    ...original,
    ResponsiveContainer: ({ children }: ResponsiveContainerProps) => (
      <div style={{ width: 300, height: 200 }}>{children}</div>
    ),
  };
});

describe("StockCard Component", () => {
  const stock: Stock = {
    symbol: "AAPL",
    price: 150,
    direction: Direction.UP,
    history: [
      { price: 145, timestamp: 1625151600000 },
      { price: 150, timestamp: 1625155200000 },
    ],
  };

  it("should render stock symbol and price correctly", () => {
    render(<StockCard stock={stock} />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("R$ 150,00")).toBeInTheDocument();
  });

  it("should apply correct classes for stock direction", () => {
    const { container } = render(<StockCard stock={stock} />);
    expect(container.querySelector(".text-constructive")).toBeInTheDocument();

    const stockDown: Stock = {
      ...stock,
      direction: Direction.DOWN,
    };
    const { container: containerDown } = render(
      <StockCard stock={stockDown} />,
    );
    expect(
      containerDown.querySelector(".text-destructive"),
    ).toBeInTheDocument();

    const stockNone: Stock = {
      ...stock,
      direction: Direction.NONE,
    };
    const { container: containerNone } = render(
      <StockCard stock={stockNone} />,
    );
    expect(
      containerNone.querySelector(".text-constructive"),
    ).not.toBeInTheDocument();
    expect(
      containerNone.querySelector(".text-destructive"),
    ).not.toBeInTheDocument();
  });
});
