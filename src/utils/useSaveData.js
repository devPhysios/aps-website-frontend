import axios from 'axios';

export const saveData = async (id, data) => {
    const token = localStorage.getItem('studentToken')
    try {
        const response = await axios.patch(`http://localhost:8800/api/v1/dashboard/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        });

        return { jsonData: response.data, success: true };
    } catch (error) {
        return { error, success: false };
    }
};
