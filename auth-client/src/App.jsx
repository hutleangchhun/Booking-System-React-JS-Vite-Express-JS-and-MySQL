import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import SidebarLayout from './components/Sidebar/SidebarLayout';
import UserList from './pages/User/userList';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import OTPVerification from './components/Opt/OTPVerification';
import Profile from './pages/Profile/Profile';
import UnitList from './pages/Unit/unitList';
import ListUnit from './pages/ListUnit';
import BookingList from './pages/Booking/bookingList';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path='unitCard' element={<ListUnit />} />

        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <SidebarLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listuser" element={<UserList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/unit-list" element={<UnitList />} />
          <Route path="/bookinglist" element={<BookingList />} />
        </Route>
      </Routes>
    </Router>
  );
}
