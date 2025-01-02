import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    auth: true,
  }),

  getters: {
    isAuth: (state) => state.auth,
  },
});
