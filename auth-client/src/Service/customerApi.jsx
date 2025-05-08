import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/customers',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Handle errors consistently
const handleAxiosError = (error, fallbackMessage) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || fallbackMessage;

        if (status === 404) return `${fallbackMessage} — Not found (404)`;
        if (status === 500) return `${fallbackMessage} — Server error (500)`;
        if (status === 403 || status === 401) return `${fallbackMessage} — Unauthorized`;

        return `${fallbackMessage} — (${status}) ${message}`;
    } else if (error.request) {
        return 'No response from server. Please check your network connection.';
    } else {
        return `Request error: ${error.message}`;
    }
};

export const fetchAllCustomers = async () => {
    try {
        const res = await api.get("/show");
        return res.data.customers;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch customers'));
    }
}