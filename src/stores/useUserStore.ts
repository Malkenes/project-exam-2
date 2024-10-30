import { create } from "zustand";

type UserRole = "guest" | "customer" | "manager";

interface UserStore {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

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
export const useUserStore = create<UserStore>((set) => ({
  userRole: "guest",
  setUserRole: (role) => set({ userRole: role }),
}));
