import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const login = (data) => {
    try {
      localStorage.setItem("user", JSON.stringify(data));
      user.value = JSON.parse(localStorage.getItem("user"));
      console.log(user.value)
    } catch (err) {
      console.log(err);
    }
  };
  

  const logout = () => {
    try {
      localStorage.clear();
      user.value = null;
    } catch (err) {
      console.log(err);
    }
  };

  return { user, login, logout };
});
