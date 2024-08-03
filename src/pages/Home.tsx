import Ring from "@/assets/ring.svg";
import StockCard from "@/components/StockCard";
import Button from "@/components/ui/Button";
import { SortOrder } from "@/models/stock";
import useStocks from "@/stores/useStocks";
import useWebSocketStore from "@/stores/useWebSocketStore";

const Home = () => {
  const { stocks, sortOrder, toggleSortOrder, sortStocks } = useStocks();
  const { connected } = useWebSocketStore();

  return (
    <div className="px-4 pb-4 pt-20 sm:px-20 sm:pb-20">
      <div className="flex flex-col items-start justify-between gap-8 py-4 sm:py-8 md:flex-row">
        <h1 className="">Explore o mercado</h1>
        <span className="inline-flex items-center gap-2">
          <span className="text-muted-foreground">Ordenar:</span>
          <Button
            active={sortOrder === SortOrder.HIGH}
            onClick={() =>
              sortOrder === SortOrder.LOW ? toggleSortOrder() : sortStocks()
            }
          >
            Em alta
          </Button>
          <Button
            active={sortOrder === SortOrder.LOW}
            onClick={() =>
              sortOrder === SortOrder.HIGH ? toggleSortOrder() : sortStocks()
            }
          >
            Em baixa
          </Button>
        </span>
      </div>
      {stocks && stocks.length ? (
        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </main>
      ) : (
        !connected && <Ring className="mx-auto mt-10 text-secondary" />
      )}
    </div>
  );
};

export default Home;
