import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Make sure to install sweetalert2
import { registerUser } from '../Service/userApi';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const resetForm = () => {
        setForm({ username: '', email: '', password: '', role: 'user' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!form.username || !form.email || !form.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing fields',
                text: 'Please fill in all required fields.',
            });
            return;
        }

        try {
            // Call the register API
            await registerUser(form);

            // Reset form fields if registration is successful
            resetForm();

            // On success, show success alert and navigate to OTP verification page
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful! Please verify your email.',
                confirmButtonColor: 'green',
                confirmButtonText: 'Nextt'
            }).then(() => {
                // Navigate to OTP verification with email passed in state
                navigate('/verify-otp', { state: { email: form.email } });
            });

        } catch (err) {
            // Log the error and show failure alert
            console.error('Error during registration:', err.response || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || 'Please try again later.',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
