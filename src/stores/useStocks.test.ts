import { beforeEach, describe, expect, it } from "vitest";
import { Direction } from "../models/stock";
import useStockStore from "../stores/useStocks";

describe("useStockStore", () => {
  beforeEach(() => {
    useStockStore.setState({ stocks: [] });
  });

  it("should add a new stock with direction None", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);

    expect(stocks).toEqual([
      { symbol: "AAPL", price: 150, direction: Direction.None },
    ]);
  });

  it("should update an existing stock and set direction Up", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 160);

    expect(stocks).toEqual([
      { symbol: "AAPL", price: 160, direction: Direction.Up },
    ]);
  });

  it("should update an existing stock and set direction Down", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 140);

    expect(stocks).toEqual([
      { symbol: "AAPL", price: 140, direction: Direction.Down },
    ]);
  });

  it("should keep direction the same if price is unchanged", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 150);

    expect(stocks).toEqual([
      { symbol: "AAPL", price: 150, direction: Direction.None },
    ]);
  });
});
