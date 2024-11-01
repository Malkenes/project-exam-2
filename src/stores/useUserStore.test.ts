import { describe, expect, it } from "vitest";
import { useUserStore } from "./useUserStore";

describe("User Store", () => {
  it("should have user role set to guest at initial state", () => {
    const { userRole } = useUserStore.getState();

    expect(userRole).toBe("guest");
  });
});
