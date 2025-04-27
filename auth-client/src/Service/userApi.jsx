// src/services/userService.js
import axios from 'axios';
import { getToken } from '../auth';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
export const fetchAllUsers = async () => {
    try {
        const res = await api.get('/all');
        return res.data.users;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch users'));
    }
};

// Fetch single user by ID
export const fetchUserById = async (id) => {
    try {
        const res = await api.get(`/show?id=${id}`);
        return res.data.user;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch user'));
    }
};

// Update user
export const updateUser = async (id, userData) => {
    try {
        const res = await api.put(`/update?id=${id}`, userData);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to update user'));
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const res = await api.delete(`/delete?id=${id}`);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to delete user'));
    }
};

// Add this in userService.js
export const loginUser = async (credentials) => {
    try {
        const res = await axios.post('http://localhost:5000/api/login', credentials);
        return res.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await axios.post('http://localhost:5000/api/register', userData);
        return res.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

