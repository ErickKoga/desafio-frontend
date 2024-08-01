import { useEffect } from "react";
import Header from "../components/Header";
import setupWebSocket from "../services/quotesWebsocket";
import Home from "./Home";

const App = () => {
  useEffect(() => {
    setupWebSocket();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <Header />
      <Home />
    </div>
  );
};

export default App;
