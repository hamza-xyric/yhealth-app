import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressRing } from "@/components/ui/progress-ring";

describe("ProgressRing", () => {
  it("renders with correct value", () => {
    render(<ProgressRing value={75} showValue />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<ProgressRing value={50} showValue label="Today" />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(<ProgressRing value={78} label="Score" />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "78");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps value between 0 and 100", () => {
    render(<ProgressRing value={150} showValue />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("handles negative values", () => {
    render(<ProgressRing value={-10} showValue />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("handles NaN values gracefully", () => {
    render(<ProgressRing value={NaN} showValue />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { rerender } = render(<ProgressRing value={50} size="sm" />);
    let progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveStyle({ width: "48px", height: "48px" });

    rerender(<ProgressRing value={50} size="lg" />);
    progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveStyle({ width: "120px", height: "120px" });
  });
});