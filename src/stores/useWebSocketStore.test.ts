import { beforeEach, describe, expect, it } from "vitest";
import useWebSocketStore from "./useWebSocketStore";

describe("useWebSocketStore", () => {
  beforeEach(() => {
    useWebSocketStore.setState({ connected: false });
  });

  it("should have a default connected state of false", () => {
    const { connected } = useWebSocketStore.getState();
    expect(connected).toBe(false);
  });

  it("should update the connected state to true", () => {
    const { setConnected } = useWebSocketStore.getState();
    setConnected(true);

    const { connected } = useWebSocketStore.getState();
    expect(connected).toBe(true);
  });

  it("should update the connected state to false", () => {
    const { setConnected } = useWebSocketStore.getState();
    setConnected(true);
    setConnected(false);

    const { connected } = useWebSocketStore.getState();
    expect(connected).toBe(false);
  });
});
