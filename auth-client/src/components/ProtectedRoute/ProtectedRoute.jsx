import { Navigate } from 'react-router-dom';
import { getToken } from '../../auth';

export default function ProtectedRoute({ children }) {
    const token = getToken();

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/" replace />;
    }

    return children;
}
