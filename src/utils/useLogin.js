import apiClient from '../config/axios';

export const loginUser = async (matricNumber, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      matricNumber,
      password,
    });

    return { jsonData: response.data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
