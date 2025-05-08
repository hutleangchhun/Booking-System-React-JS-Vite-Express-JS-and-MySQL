import Sidebar from './Sidebar';
import Navbar from '../Navbar/navbar';
import { Outlet } from 'react-router-dom';

export default function SidebarLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 bg-opacity-50">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
