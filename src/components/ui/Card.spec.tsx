import Card from "@/components/ui/Card";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Card Component", () => {
  it("should render children correctly", () => {
    render(
      <Card>
        <div data-testid="child">Test Child</div>
      </Card>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should apply custom class names and merge with default", () => {
    const customClass = "custom-class";
    const { container } = render(
      <Card className={customClass}>
        <div>Test Content</div>
      </Card>,
    );
    expect(container.firstChild).toHaveClass(
      "border border-muted custom-class",
    );
  });

  it("should pass through additional props", () => {
    const { container } = render(
      <Card id="test-id" data-test="test-data">
        <div>Test Content</div>
      </Card>,
    );
    expect(container.firstChild).toHaveAttribute("id", "test-id");
    expect(container.firstChild).toHaveAttribute("data-test", "test-data");
  });
});
