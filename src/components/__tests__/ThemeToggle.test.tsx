import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle (dark-only)", () => {
  it("renders and stays on Dark", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    expect(screen.getByText(/dark/i)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText(/dark/i)).toBeInTheDocument();
  });
});
