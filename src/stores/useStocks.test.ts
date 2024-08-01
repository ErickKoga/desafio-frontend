import { beforeEach, describe, expect, it } from "vitest";
import { Direction } from "../models/stock";
import useStockStore from "../stores/useStocks";

describe("useStockStore", () => {
  beforeEach(() => {
    useStockStore.setState({ stocks: [] });
  });

  it("should have an initial state with an empty stock list", () => {
    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([]);
  });

  it("should add a new stock with direction None and correct history", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);

    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 150,
        direction: Direction.None,
        history: [{ price: 150, timestamp: expect.any(Number) }],
      },
    ]);
  });

  it("should update an existing stock and set direction Up, with correct history", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 160);

    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 160,
        direction: Direction.Up,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 160, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should update an existing stock and set direction Down, with correct history", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 140);

    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 140,
        direction: Direction.Down,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 140, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should keep direction the same if price is unchanged, with correct history", () => {
    const { update, stocks } = useStockStore.getState();
    update("AAPL", 150);
    update("AAPL", 150);

    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 150,
        direction: Direction.None,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 150, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should maintain a history of only the last 10 updates", () => {
    const { update, stocks } = useStockStore.getState();
    for (let i = 0; i < 12; i++) {
      update("AAPL", 150 + i);
    }

    const expectedHistory = Array.from({ length: 10 }, (_, i) => ({
      price: 152 + i,
      timestamp: expect.any(Number),
    }));

    expect(stocks[0].history).toEqual(expectedHistory);
  });
});
