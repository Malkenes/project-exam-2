/*
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SignOutButton } from "./signOutButton";
import { theme } from "../../shared/theme";
import { ThemeProvider } from "styled-components";
import { useUserStore } from "../../stores/useUserStore";

vi.mock("../../stores/useUserStore", () => ({
    useUserStore: vi.fn(),
}));

describe("Sign Out Button", () => {
    const renderWithProviders = () => {
        const resetMock = vi.fn();
        render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <SignOutButton />
                </MemoryRouter>
            </ThemeProvider>
        );
        return { resetMock };
    }
    it("should render the button", () => {
        renderWithProviders();
        expect(screen.getByText("Sign Out"));
    });
    it("should navigate to homepage on click", () => {
        renderWithProviders();
        const button = screen.getByRole("link", { name: /sign out/i });
        fireEvent.click(button);
        expect(window.location.pathname).toBe("/");
    })
})
*/
