import { useState } from 'react';
import { verifyOTP } from '../../Service/userApi';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OTPVerification() {
    const [otp, setOtp] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();

    // Ensure state and email are present
    if (!state || !state.email) {
        navigate('/register'); // Or display an error message
        return null;
    }

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await verifyOTP({ email: state.email, otp: Number(otp) }); // Force otp to number
            Swal.fire({
                icon: "success",
                title: "OTP Verified Successfully!",
                confirmButtonColor: "red",
                confirmButtonText: "Close",
            }).then(() => {
                navigate("/");
            });
        } catch (err) {
            console.error("OTP Verification Failed:", err);
            Swal.fire({
                icon: "error",
                title: "OTP Verification Failed!",
                text: err.response?.data?.message || "Please try again later.",
            });
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

                <input
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    onChange={handleChange}
                    value={otp}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
}
