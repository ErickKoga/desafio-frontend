import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import setupWebSocket from "../services/quotesWebsocket";
import App from "./App";

vi.mock("../services/quotesWebsocket", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Home component and Header", () => {
    render(<App />);
    expect(screen.getByText("Explore o mercado")).toBeInTheDocument();
  });

  it("should call setupWebSocket on mount", async () => {
    render(<App />);
    await waitFor(() => {
      expect(setupWebSocket).toHaveBeenCalled();
    });
  });
});
