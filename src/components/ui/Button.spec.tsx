// Button.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("applies inactive styles when active is false", () => {
    render(<Button active={false}>Inactive</Button>);
    const button = screen.getByRole("button", { name: /inactive/i });
    expect(button).toHaveClass("bg-muted");
  });

  it("handles click events", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
