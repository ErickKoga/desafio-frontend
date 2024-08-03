import { Direction, SortOrder, Stock } from "@/models/stock";
import { create } from "zustand";

interface StockState {
  stocks: Stock[];
  sortOrder: SortOrder;
  batchUpdate: (updates: { symbol: string; price: number }[]) => void;
  toggleSortOrder: () => void;
  sortStocks: () => void;
}

const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  sortOrder: SortOrder.HIGH,

  batchUpdate: (updates) => {
    set((state) => {
      const stocks = [...state.stocks];

      updates.forEach(({ symbol, price }) => {
        const timestamp = Date.now();
        const index = stocks.findIndex((stock) => stock.symbol === symbol);

        if (index !== -1) {
          const currentStock = stocks[index];
          const newDirection =
            price > currentStock.price
              ? Direction.UP
              : price < currentStock.price
                ? Direction.DOWN
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
            direction: Direction.NONE,
            history: [{ price, timestamp }],
          };
          stocks.push(newStock);
        }
      });

      return { stocks };
    });
  },

  toggleSortOrder: () => {
    set((state) => ({
      sortOrder:
        state.sortOrder === SortOrder.HIGH ? SortOrder.LOW : SortOrder.HIGH,
    }));
    get().sortStocks();
  },

  sortStocks: () => {
    set((state) => {
      const sortedStocks = [...state.stocks].sort((a, b) =>
        state.sortOrder === SortOrder.HIGH
          ? b.price - a.price
          : a.price - b.price,
      );

      return { stocks: sortedStocks };
    });
  },
}));

export default useStockStore;
