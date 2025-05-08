import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../auth';
import { loginUser } from '../Service/userApi'; // Updated import
import Swal from 'sweetalert2';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(form); // Use loginUser function
            setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // diplay user name in other components
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Unable to connect to the database. Please try again later!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}