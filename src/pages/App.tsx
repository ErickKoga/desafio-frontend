import React, { useEffect } from "react";
import { toBRL } from "../helpers/monetary";
import setupWebSocket from "../services/quotesWebsocket";
import useStocks from "../stores/useStocks";

const App: React.FC = () => {
  const { stocks } = useStocks();

  useEffect(() => {
    setupWebSocket();
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      {stocks.map((stock) => (
        <div key={stock.symbol}>
          <h2>{stock.symbol}</h2>
          <p>
            {toBRL(stock.price)}
            {stock.direction === "up" && (
              <span style={{ color: "green" }}>▲</span>
            )}
            {stock.direction === "down" && (
              <span style={{ color: "red" }}>▼</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
