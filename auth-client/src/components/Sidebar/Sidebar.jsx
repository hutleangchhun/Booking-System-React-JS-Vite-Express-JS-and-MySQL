import { NavLink, useNavigate } from 'react-router-dom';
import { getUserRole, removeToken } from '../../auth';
import Icon from '../../assets/Icons/icons';
import Swal from 'sweetalert2';
import Logo from '../../assets/Images/booking-logo.png';

export default function Sidebar() {
    const role = getUserRole();
    const navigate = useNavigate();

    const handleLogout = async () => {
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

    const linkStyle = ({ isActive }) =>
        isActive
            ? 'flex flex-col justify-center items-center text-blue-700 bg-blue-200 bg-opacity-50 rounded p-3 font-semibold text-center'
            : 'flex flex-col justify-center items-center text-gray-700 p-3 transition ease-in duration-200 hover:text-blue-700 hover:bg-blue-200 hover:bg-opacity-50 hover:rounded text-center';

    return (
        <aside className="w-28 bg-white shadow-md flex flex-col justify-between p-2 text-sm">
            <div>
                <nav className="space-y-2">
                    <div className='flex justify-center items-center'>
                        <img src={Logo} alt="logo" className='rounded-full w-14 h-14' />
                    </div>
                    <NavLink to="/dashboard" className={linkStyle}>
                        <Icon name="dashboard" className='text-xl mb-2' />
                        Dashboard
                    </NavLink>

                    {role === 'admin' && (
                        <>
                            <NavLink to="/listuser" className={linkStyle}>
                                <Icon name="userList" className='text-xl mb-2' />
                                User List
                            </NavLink>
                            <NavLink to="/unit-list" className={linkStyle}>
                                <Icon name="unit" className='text-xl mb-2' />
                                Units List
                            </NavLink>
                            <NavLink to="/bookinglist" className={linkStyle}>
                                <Icon name="booking" className='text-xl mb-2' />
                                Booking
                            </NavLink>
                        </>
                    )}

                    {role === 'user' && (
                        <>
                            <NavLink to="/listuser" className={linkStyle}>
                                <Icon name="userList" className='text-xl mb-2' />
                                User List
                            </NavLink>
                            <NavLink to="/unit-list" className={linkStyle}>
                                <Icon name="unit" className='text-xl mb-2' />
                                Units List
                            </NavLink>
                            <NavLink to="/bookinglist" className={linkStyle}>
                                <Icon name="booking" className='text-xl mb-2' />
                                Booking
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-100 text-red-600 p-3 rounded ease-in-out duration-300 hover:text-white hover:bg-red-600 flex flex-col justify-center items-center"
            >
                <Icon name="logout" className='mb-2 text-xl' />
                Logout

            </button>
        </aside>
    );
}
