import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, getUserInfo } from '../../auth';
import Swal from 'sweetalert2';
import Icon from '../../assets/Icons/icons';

export default function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = getUserInfo();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        setDropdownOpen(false); // Close dropdown
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to Logout',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Logout!',
        });

        if (result.isConfirmed) {
            removeToken();
            navigate('/');
        }
    };

    const handleViewProfile = () => {
        setDropdownOpen(false); // Close dropdown
        navigate('/profile');
    };

    return (
        <nav className="bg-white shadow-md flex justify-between items-center px-6 py-3">
            <h1 className="text-lg font-bold text-gray-700">Booking Management System</h1>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-blue-600 text-white p-3 rounded-full duration-300 ease-in-out hover:bg-blue-700 flex items-center space-x-2"
                >
                    <Icon name="user" />
                    {/** <span>{user?.username || 'Profile'}</span> */}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-4 w-40 bg-white border rounded-md shadow z-10 text-sm font-semibold">
                        <button
                            onClick={handleViewProfile}
                            className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white rounded-t-md ease-in-out duration-300 hover:font-medium text-gray-700"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-red-500 text-red-600 hover:text-white rounded-b-md ease-in-out duration-300 hover:font-medium"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
