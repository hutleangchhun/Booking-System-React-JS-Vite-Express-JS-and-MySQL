import React, { useState, useEffect } from 'react';
import { registerUser, updateUser } from '../../Service/userApi';
import Swal from 'sweetalert2';

const UserForm = ({ mode = 'create', user = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        eamil: "",
        role: 'user',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                password: '',
                email: user.email || "",
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
        <>
            <h1 className='text-base font-bold mb-5 pb-2 capitalize text-gray-700 border-b-2 border-gray-300'>Please fill in user information</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto text-sm">
                <div className='grid grid-cols-2 gap-5'>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent border-gray-300 text-gray-700 font-semibold"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent border-gray-300 text-gray-700 font-semibold"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent border-gray-300 text-gray-700 font-semibold"
                        required={mode === 'create'} // password required only when creating
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent border-gray-300 text-gray-700 font-semibold"
                        required={mode === 'create'} // password required only when creating
                    />
                </div>

                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className=" bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {mode === 'create' ? 'Create User' : 'Update User'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserForm;
