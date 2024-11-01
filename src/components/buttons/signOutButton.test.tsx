import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SignOutButton } from "./signOutButton";
import { theme } from "../../shared/theme";
import { ThemeProvider } from "styled-components";

describe("Sign Out Button", () => {
  const renderWithProviders = () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <SignOutButton />
        </MemoryRouter>
      </ThemeProvider>,
    );
  };
  it("should render the button", () => {
    renderWithProviders();
    expect(screen.getByText("Sign Out"));
  });
  /*it("should navigate to homepage on click", () => {
        renderWithProviders();
        const button = screen.getByRole("button", { name: /sign out/i });
        fireEvent.click(button);
        expect(window.location.pathname).toBe("/");
    })*/
});
