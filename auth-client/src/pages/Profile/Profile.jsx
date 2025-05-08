import React, { useEffect, useState } from 'react';
import { getToken, setToken } from '../../auth';
import { updateUser } from '../../Service/userApi'; // ✅ adjust path as needed
import Swal from 'sweetalert2';
import SystemInfo from '../../components/Card/systemInformation';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // Add confirmPassword state
        email: '',
        role: 'user',
    });

    const [isPasswordChanging, setIsPasswordChanging] = useState(false); // Track if user wants to change password

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);
            } catch (err) {
                console.error('Invalid token', err);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                password: '', // Don't prefill password
                confirmPassword: '', // Don't prefill confirmPassword
                email: user.email || '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChangeToggle = () => {
        setIsPasswordChanging(!isPasswordChanging);
        setFormData({
            ...formData,
            password: '',
            confirmPassword: '', // Reset password and confirm password fields
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If the user wants to change the password, check if both passwords match
        if (isPasswordChanging && formData.password !== formData.confirmPassword) {
            Swal.fire('Error', 'Passwords do not match!', 'error');
            return;
        }

        try {
            const response = await updateUser(user.id, formData);
            if (response.token) {
                setToken(response.token); // Save new token in localStorage
                const updatedPayload = JSON.parse(atob(response.token.split('.')[1]));
                setUser(updatedPayload); // Update local state
            }
            Swal.fire('Success', 'User updated', 'success');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    if (!user) return <p className="p-4 text-gray-500">No user data found.</p>;

    return (
        <div className='grid grid-cols-2 gap-6'>
            <div className="p-2">
                <h2 className="text-base font-bold mb-4 text-gray-700">User Profile</h2>
                <form onSubmit={handleSubmit} className='text-sm'>
                    <label className='font-semibold text-gray-700'>Username</label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 my-2 border rounded-md bg-transparent border-gray-300 text-gray-700 font-semibold"
                        placeholder="Username"
                    />
                    <label className='font-semibold text-gray-700'>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 my-2 border rounded-md bg-transparent border-gray-300 text-gray-700 font-semibold"
                        placeholder="Email"
                    />

                    {/* Password field */}
                    {isPasswordChanging && (
                        <>
                            <label className='font-semibold text-gray-700'>New password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 my-3 border rounded-md bg-transparent border-gray-300 text-gray-700 font-semibold"
                                placeholder="New Password"
                            />
                            <label className='font-semibold text-gray-700'>Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 my-2 border rounded-md bg-transparent border-gray-300 text-gray-700 font-semibold"
                                placeholder="Confirm Password"
                            />
                        </>
                    )}

                    <button
                        type="button"
                        onClick={handlePasswordChangeToggle}
                        className="text-blue-500 font-semibold my-2"
                    >
                        {isPasswordChanging ? 'Cancel password change' : 'Change Password'}
                    </button>

                    <div>
                        <label className='font-semibold text-gray-700'>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 my-2 border rounded-md bg-white bg-transparent border-gray-300 text-gray-700 font-semibold"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 my-2"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
            <SystemInfo />
        </div>
    );
}
