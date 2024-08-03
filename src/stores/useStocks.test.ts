import { Direction } from "@/models/stock";
import useStockStore from "@/stores/useStocks";
import { beforeEach, describe, expect, it } from "vitest";

describe("useStockStore", () => {
  beforeEach(() => {
    useStockStore.setState({ stocks: [] });
  });

  it("should have an initial state with an empty stock list", () => {
    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([]);
  });

  it("should add a new stock with direction None and correct history", () => {
    const { batchUpdate } = useStockStore.getState();
    batchUpdate([{ symbol: "AAPL", price: 150 }]);

    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 150,
        direction: Direction.NONE,
        history: [{ price: 150, timestamp: expect.any(Number) }],
      },
    ]);
  });

  it("should update an existing stock and set direction Up, with correct history", () => {
    const { batchUpdate } = useStockStore.getState();
    batchUpdate([{ symbol: "AAPL", price: 150 }]);
    batchUpdate([{ symbol: "AAPL", price: 160 }]);

    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 160,
        direction: Direction.UP,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 160, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should update an existing stock and set direction Down, with correct history", () => {
    const { batchUpdate } = useStockStore.getState();
    batchUpdate([{ symbol: "AAPL", price: 150 }]);
    batchUpdate([{ symbol: "AAPL", price: 140 }]);

    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 140,
        direction: Direction.DOWN,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 140, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should keep direction the same if price is unchanged, with correct history", () => {
    const { batchUpdate } = useStockStore.getState();
    batchUpdate([{ symbol: "AAPL", price: 150 }]);
    batchUpdate([{ symbol: "AAPL", price: 150 }]);

    const { stocks } = useStockStore.getState();
    expect(stocks).toEqual([
      {
        symbol: "AAPL",
        price: 150,
        direction: Direction.NONE,
        history: [
          { price: 150, timestamp: expect.any(Number) },
          { price: 150, timestamp: expect.any(Number) },
        ],
      },
    ]);
  });

  it("should maintain a history of only the last 10 updates", () => {
    const { batchUpdate } = useStockStore.getState();
    const updates = Array.from({ length: 12 }, (_, i) => ({
      symbol: "AAPL",
      price: 150 + i,
    }));

    batchUpdate(updates);

    const { stocks } = useStockStore.getState();
    const expectedHistory = Array.from({ length: 10 }, (_, i) => ({
      price: 152 + i,
      timestamp: expect.any(Number),
    }));

    expect(stocks[0].history).toEqual(expectedHistory);
  });
});
