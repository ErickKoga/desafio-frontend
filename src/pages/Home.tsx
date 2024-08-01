import StockCard from "../components/StockCard";
import useStocks from "../stores/useStocks";

const Home = () => {
  const { stocks } = useStocks();

  return (
    <div className="px-4 sm:px-20">
      <h1 className="py-4 sm:py-8">Explore o mercado</h1>
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </main>
    </div>
  );
};

export default Home;
