import useStockStore from "../stores/useStocks";

const setupWebSocket = () => {
  const { update } = useStockStore.getState();

  const quotesmockUrl = import.meta.env.APP_QUOTESMOCK_URL;
  const quotesmockPort = import.meta.env.APP_QUOTESMOCK_PORT;
  const socketUrl = `${quotesmockUrl}:${quotesmockPort}/quotes`;

  try {
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const [symbol, price] = Object.entries(message).find(
        ([key]) => key !== "timestamp"
      ) as [string, number];
      update(symbol, price);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(setupWebSocket, 1000);
    };
  } catch (error) {
    console.error("WebSocket setup failed:", error);
  }
};

export default setupWebSocket;
