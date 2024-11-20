import apiClient from '../config/axios';
import { useToast } from "vue-toastification";

const toast = useToast();

export const saveData = async (data) => {
  const token = localStorage.getItem("studentToken");
  try {
    const response = await apiClient.patch('/dashboard/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Profile Updated");
    return { jsonData: response.data, success: true };
  } catch (error) {
    toast.error("Profile Update Failed");
    return { error, success: false };
  }
};
