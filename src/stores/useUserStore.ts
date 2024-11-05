import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignInUser } from "../shared/types";
type UserRole = "guest" | "customer" | "manager";

type State = {
  userRole: UserRole;
  userData: SignInUser;
  keepSignedIn: boolean;
};
type Actions = {
  setUserData: (userData: SignInUser) => void;
  setKeepSignedIn: (isEnabled: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  userRole: "guest",
  userData: {
    name: "",
    email: "",
    avatar: {
      url: "/img/logo_holidaze.png",
      alt: "logo",
    },
    banner: {
      url: "",
      alt: "",
    },
    accessToken: "",
    venueManager: false,
  },
  keepSignedIn: false,
};

/**
 * Custom hook for managing user state in the Holidaze application.
 *
 * This hook utilizes Zustand to create a store that holds the
 * user's role and provides a function to update it. The default
 * user role is set to "guest".
 *
 * @returns {Object} The user store object containing:
 * @returns {string} userRole - The current role of the user (default: "guest").
 * @returns {function} setUserRole - A function to update the user role.
 *
 * @example
 * // Usage within a component
 * import { useUserStore } from './userStore';
 *
 * const UserProfile = () => {
 *   const { userRole, setUserRole } = useUserStore();
 *
 *   const handleRoleChange = (newRole) => {
 *     setUserRole(newRole);
 *   };
 *
 *   return <div>User Role: {userRole}</div>;
 * };
 */
export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUserData: (userData) =>
        set(() => ({
          userData: userData,
          userRole: userData.venueManager ? "manager" : "customer",
        })),
      setKeepSignedIn: (isEnabled) => set({ keepSignedIn: isEnabled }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "user",
      partialize: (state) => (state.keepSignedIn ? state : {}),
      onRehydrateStorage: () => (state) => {
        if (state && !state.keepSignedIn) localStorage.removeItem("user");
      },
    },
  ),
);
