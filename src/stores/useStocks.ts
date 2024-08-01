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
      const index = state.stocks.findIndex((stock) => stock.symbol === symbol);
      const stocks = state.stocks;
      if (index !== -1) {
        const currentStock = stocks[index];
        const newDirection =
          price > currentStock.price
            ? Direction.Up
            : price < currentStock.price
              ? Direction.Down
              : null;

        stocks[index] = {
          ...currentStock,
          price,
          direction: newDirection ?? currentStock.direction,
        };
      } else {
        const newStock = {
          symbol,
          price,
          direction: Direction.None,
        };
        stocks.push(newStock);
      }
      return { stocks };
    });
  },
}));

export default useStockStore;
