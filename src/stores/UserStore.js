import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  let displayFooter = ref(true);

  const login = (data) => {
    try {
      localStorage.setItem("user", JSON.stringify(data));
      user.value = JSON.parse(localStorage.getItem("user"));
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

  const save = (data) => {
    try {
      localStorage.setItem("user", JSON.stringify(data));
      user.value = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfilePicture = (profilePicture) => {
    if (user.value) {
      user.value.profilePicture = profilePicture;
      save(user.value);
    }
  };

  const updateFooterVisibility = (value) => {
    displayFooter.value = value;
  };

  return { user, login, logout, save, updateProfilePicture, updateFooterVisibility, displayFooter };
});