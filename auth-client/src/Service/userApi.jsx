// src/services/userService.js
import axios from 'axios';
import { getToken } from '../auth';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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
        const res = await api.get('users/all');
        return res.data.users;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch users'));
    }
};

// Count all users
export const countAllUsers = async () => {
    try {
        const res = await api.get('/users/count');
        return res.data.count;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to count users'));
    }
};


// Fetch single user by ID
export const fetchUserById = async (id) => {
    try {
        const res = await api.get(`users/show?id=${id}`);
        return res.data.user;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch user'));
    }
};

// Update user
export const updateUser = async (id, userData) => {
    try {
        const res = await api.put(`users/update?id=${id}`, userData);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to update user'));
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const res = await api.delete(`users/delete?id=${id}`);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to delete user'));
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await api.post('/register', userData);  // API call to register user
        return res.data;  // Return the response data if registration is successful
    } catch (error) {
        // Check if error.response is available and handle it
        if (error.response) {
            // If the backend returns a response with an error message
            console.error('Registration error:', error.response.data || error.message);
            throw new Error(`Registration failed: ${error.response.data?.message || error.message}`);
        } else if (error.request) {
            // If the request was made but no response was received
            console.error('No response received from the server:', error.request);
            throw new Error('Registration failed: No response from server.');
        } else {
            // For other errors
            console.error('Error during registration request:', error.message);
            throw new Error(`Registration failed: ${error.message}`);
        }
    }
};


export const loginUser = async (credentials) => {
    try {
        const res = await api.post('/login', credentials);  // API call to log in user
        return res.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const verifyOTP = async ({ email, otp }) => {
    try {
        const res = await api.post('/verify-otp', { email, otp });  // API call to verify OTP
        return res.data;  // Return the response data on success
    } catch (error) {
        // Log the full error for debugging
        console.error('Error details:', error.response || error.message);

        // Throw a detailed error message
        const errorMessage = error.response?.data?.message || 'OTP verification failed. Please try again.';
        throw new Error(errorMessage);
    }
};