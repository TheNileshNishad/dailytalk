import { create } from "zustand"

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  setAuthData: (user, accessToken) => set({ user, accessToken }),
  clearAuthData: () => set({ user: null, accessToken: null }),
}))

export default useAuthStore
