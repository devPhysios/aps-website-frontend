import axios from "axios";

export const loginUser = async (matricNumber, password) => {
  try {
    const response = await axios.post(
      "https://api.apsui.com/api/v1/auth/login",
      {
        matricNumber,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { jsonData: response.data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
