import { create } from "zustand";
import { Direction, Stock } from "../models/stock";

interface StockState {
  stocks: Stock[];
  update: (symbol: string, price: number) => void;
}

const useStockStore = create<StockState>((set) => ({
  stocks: [],
  update: (symbol: string, price: number) => {
    set((state) => {
      const timestamp = Date.now();

      const index = state.stocks.findIndex((stock) => stock.symbol === symbol);
      const stocks = state.stocks;

      if (index !== -1) {
        const currentStock = stocks[index];
        const newDirection =
          price > currentStock.price
            ? Direction.Up
            : price < currentStock.price
              ? Direction.Down
              : currentStock.direction;

        const newHistory = [
          ...currentStock.history,
          { price, timestamp },
        ].slice(-10);

        stocks[index] = {
          ...currentStock,
          price,
          direction: newDirection,
          history: newHistory,
        };
      } else {
        const newStock: Stock = {
          symbol,
          price,
          direction: Direction.None,
          history: [{ price, timestamp }],
        };
        stocks.push(newStock);
      }
      return { stocks };
    });
  },
}));

export default useStockStore;
