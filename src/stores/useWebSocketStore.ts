import { create } from "zustand";

interface WebSocketState {
  connected: boolean;
  setConnected: (connected: boolean) => void;
}

const useWebSocketStore = create<WebSocketState>((set) => ({
  connected: false,
  setConnected: (connected) => set({ connected: connected }),
}));

export default useWebSocketStore;
