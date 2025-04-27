import { NavLink, Outlet} from 'react-router-dom';
import { getUserRole, removeToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SidebarLayout() {
    const role = getUserRole();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to Logout`,
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
        } catch (error) {
            console.error('Error logging out:', error);
            Swal.fire('Error', 'Failed to log out.', 'error');
        }
    };

    // Style for active links
    const linkStyle = ({ isActive }) =>
        isActive
            ? 'block text-blue-700 bg-blue-200 bg-opacity-50 rounded px-3 py-2 font-semibold'
            : 'block text-gray-700 px-3 py-2 transition ease-in duration-200 hover:text-blue-700 hover:bg-blue-200 hover:bg-opacity-50 hover:rounded';

    return (
        <div className="flex min-h-screen bg-gray-100 bg-opacity-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col justify-between p-3">
                {/* Top section: navigation links */}
                <div>
                    <h2 className="text-xl font-bold bg-blue-500 bg-opacity-30 text-center py-4 mb-5 rounded text-blue-600 border-2 border-opacity-30 border-blue-500">HRMS</h2>
                    <nav className="space-y-1">
                        <NavLink to="/dashboard" className={linkStyle}>
                            Dashboard
                        </NavLink>

                        {role === 'admin' && (
                            <>
                                <NavLink to="/listuser" className={linkStyle}>
                                    User List
                                </NavLink>
                            </>
                        )}

                        {role === 'user' && (
                            <>
                                <NavLink to="/listuser" className={linkStyle}>
                                    User List
                                </NavLink>
                            </>
                        )}
                    </nav>
                </div>

                {/* Bottom section: logout */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 rounded text-white px-3 py-2 hover:underline w-full mt-4"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-3">
                <Outlet />
            </main>
        </div>
    );
}
