import useStockStore from "@/stores/useStocks";
import useWebSocketStore from "@/stores/useWebSocketStore";

const setupWebSocket = () => {
  const { batchUpdate } = useStockStore.getState();
  const { setConnected } = useWebSocketStore.getState();

  const quotesmockUrl = import.meta.env.APP_QUOTESMOCK_URL;
  const quotesmockPort = import.meta.env.APP_QUOTESMOCK_PORT;
  const socketUrl = `${quotesmockUrl}:${quotesmockPort}/quotes`;

  try {
    const socket = new WebSocket(socketUrl);
    const batch = new Map<string, number>();
    let timer: NodeJS.Timeout | null = null;

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const [symbol, price] = Object.entries(message).find(
        ([key]) => key !== "timestamp",
      ) as [string, number];

      batch.set(symbol, price);

      if (!timer) {
        timer = setInterval(() => {
          if (batch.size > 0) {
            batchUpdate(
              Array.from(batch.entries()).map(([symbol, price]) => ({
                symbol,
                price,
              })),
            );
            batch.clear();
          }
        }, 200);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);
      if (timer) {
        clearInterval(timer);
      }
      setTimeout(setupWebSocket, 1000);
    };
  } catch (error) {
    console.error("WebSocket setup failed:", error);
  }
};

export default setupWebSocket;
