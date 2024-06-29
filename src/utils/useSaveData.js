import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const saveData = async (data) => {
  const token = localStorage.getItem("studentToken");
  try {
    const response = await axios.patch(
      `https://api.apsui.com/api/v1/dashboard/profile`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Profile Updated");
    return { jsonData: response.data, success: true };
  } catch (error) {
    toast.error("Profile Update Failed");
    return { error, success: false };
  }
};
