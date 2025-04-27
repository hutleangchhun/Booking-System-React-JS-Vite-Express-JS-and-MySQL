import * as userModel from '../models/userModel.js';
import { sendJsonResponse } from '../utils/utils.js'; // Utility to send JSON responses

// Show a single user
export const showUser = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'User ID is required' });
    }

    try {
        const user = await userModel.getUserById(id);
        sendJsonResponse(res, 200, { user });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
};

// Fetch all users
export const fetchAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        sendJsonResponse(res, 200, { users });
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Failed to retrieve users' });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
        return sendJsonResponse(res, 400, { error: 'Missing required fields' });
    }

    try {
        const userId = await userModel.createUser(name, email, password, age);
        sendJsonResponse(res, 201, { message: 'User created', userId });
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Failed to create user' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.query;
    const { username, password, role } = req.body;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'User ID is required' });
    }

    if (!username || !role) {
        return sendJsonResponse(res, 400, { error: 'Missing required fields' });
    }

    try {
        await userModel.updateUser(id, username, password, role);
        sendJsonResponse(res, 200, { message: 'User updated' });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'User ID is required' });
    }

    try {
        await userModel.deleteUser(id);
        sendJsonResponse(res, 200, { message: 'User deleted' });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
};
