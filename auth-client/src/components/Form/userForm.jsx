// src/components/UserForm/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { registerUser, updateUser } from '../../Service/userApi';
import Swal from 'sweetalert2';

const UserForm = ({ mode = 'create', user = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'user',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                password: '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await registerUser(formData); // Creating new user
                Swal.fire('Success', 'User created successfully!', 'success');
            } else if (mode === 'update') {
                const dataToUpdate = { ...formData };

                // 👉 Remove password field if it's empty
                if (!dataToUpdate.password) {
                    delete dataToUpdate.password;
                }

                await updateUser(user.id, dataToUpdate); // Updating existing user
                Swal.fire('Success', 'User updated successfully!', 'success');
            }
            onSuccess(); // Callback after success
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Operation failed.', 'error');
        }
    };



    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Username</label>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required={mode === 'create'} // password required only when creating
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                {mode === 'create' ? 'Create User' : 'Update User'}
            </button>
        </form>
    );
};

export default UserForm;
