import axios from 'axios';

export const saveData = async (id, data) => {
    try {
        const response = await axios.patch(`http://localhost:8800/api/v1/dashboard/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return { jsonData: response.data, success: true };
    } catch (error) {
        return { error, success: false };
    }
};
