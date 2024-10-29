import { create } from "zustand";

type UserRole = "guest" | "customer" | "manager";

interface UserStore {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userRole: "guest",
  setUserRole: (role) => set({ userRole: role }),
}));
