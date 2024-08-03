import Header from "@/components/Header";
import Home from "@/pages/Home";
import setupWebSocket from "@/services/quotesWebsocket";
import { useEffect } from "react";

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
