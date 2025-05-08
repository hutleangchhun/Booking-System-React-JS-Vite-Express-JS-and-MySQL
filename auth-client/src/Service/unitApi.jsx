import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/units',
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

// === User API Methods ===

// Fetch all users
export const fetchAllUnits = async () => {
    try {
        const res = await api.get('all');
        return res.data.units;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch units'));
    }
};

// Count all users
export const countAllUnits = async () => {
    try {
        const res = await api.get('count');
        return res.data.count;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to count users'));
    }
};

// Delete user
export const deleteUnit = async (id) => {
    try {
        const res = await api.delete(`delete?id=${id}`);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to delete unit'));
    }
};

export const createUnit = async (unitData) => {
    try {
        const res = await api.post('create', unitData);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to create unit'));
    }
};

export const fetchAvailableUnits = async () => {
    try {
        const res = await api.get('available');
        return res.data.count;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch available units'));
    }
};

export const updateUnit = async (id, unitData) => {
    try {
        const res = await api.put(`update?id=${id}`, unitData);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to update unit'));
    }
};