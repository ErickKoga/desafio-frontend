import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Direction } from "../models/stock";
import StockCard from "./StockCard";

describe("StockCard Component", () => {
  const stock = { symbol: "AAPL", price: 150, direction: Direction.Up };

  it("should render stock symbol and price correctly", () => {
    render(<StockCard stock={stock} />);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("R$ 150,00")).toBeInTheDocument();
  });

  it("should apply correct classes for stock direction", () => {
    const { container } = render(<StockCard stock={stock} />);
    expect(container.querySelector(".text-constructive")).toBeInTheDocument();

    stock.direction = Direction.Down;
    const { container: containerDown } = render(<StockCard stock={stock} />);
    expect(
      containerDown.querySelector(".text-destructive"),
    ).toBeInTheDocument();

    stock.direction = Direction.None;
    const { container: containerNone } = render(<StockCard stock={stock} />);
    expect(
      containerNone.querySelector(".text-constructive"),
    ).not.toBeInTheDocument();
    expect(
      containerNone.querySelector(".text-destructive"),
    ).not.toBeInTheDocument();
  });
});
