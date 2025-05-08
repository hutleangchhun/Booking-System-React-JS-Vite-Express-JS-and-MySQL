import * as userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
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

//Count all users
export const getUserCount = async (req, res) => {
    try {
        const results = await userModel.countAllUsers();
        const count = results[0]?.total || 0; // safe access with fallback
        res.json({ count });
    } catch (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ message: 'Failed to count users' });
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
    const { username, password, role, email } = req.body;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'User ID is required' });
    }

    if (!username || !role) {
        return sendJsonResponse(res, 400, { error: 'Missing required fields' });
    }
    console.log('Updating user with ID:', id);
    console.log('Data:', { username, password, role, email });

    try {
        await userModel.updateUser(id, username, password, role, email);
        console.log('User updated successfully');

        // Fetch updated user data
        const updatedUser = await userModel.getUserById(id);
        console.log('Updated user:', updatedUser);

        // Create new JWT token
        const token = jwt.sign(
            {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                role: updatedUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        sendJsonResponse(res, 200, { message: 'User updated', token });
    } catch (err) {
        console.error("Update error:", err);
        sendJsonResponse(res, 500, { error: err.message || err });
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
