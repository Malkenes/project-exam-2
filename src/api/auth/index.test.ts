import { describe, it, expect, vi, beforeEach } from "vitest";
import { signIn } from ".";
import { SignInResponse } from "../../shared/types";

describe("sign in", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return the response data on successful login", async () => {
    const mockResponse: SignInResponse = {
      data: {
        name: "ola Normann",
        email: "olaNormann@stud.noroff.no",
        avatar: { url: "url", alt: "alt" },
        banner: { url: "url", alt: "alt" },
        accessToken: "snansdndeq-sqx",
        venueManager: false,
      },
      meta: {},
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await signIn(
      "olaNormann@stud.noroff.no",
      "superComplexPassword123",
    );
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_NOROFF_BASE}auth/login?_holidaze=true`,
      expect.objectContaining({
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "olaNormann@stud.noroff.no",
          password: "superComplexPassword123",
        }),
      }),
    );
  });

  it("should throw an error with the message from the server on failed login", async () => {
    const errorMessage = "Invalid credentials";
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ errors: [{ message: errorMessage }] }),
    });

    await expect(
      signIn("olaNormann@stud.noroff.no", "wrongpassword"),
    ).rejects.toThrow(errorMessage);
  });
});
