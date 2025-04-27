import { useEffect, useState } from 'react';
import { getToken } from '../../auth';

export default function Welcome() {
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.username) {
                    setUsername(payload.username);
                }
            } catch (error) {
                console.error('Invalid token format', error);
            }
        }
    }, []);

    // Auto close after 10 seconds
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!username || !visible) return null;

    return (
        <div className="relative bg-blue-100 rounded-md p-4 shadow-sm animate-fade-in">
            <button
                onClick={() => setVisible(false)}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 text-4xl"
            >
                ×
            </button>
            <h3 className="text-xl font-semibold text-blue-600">
                Welcome back, {username}!
            </h3>
        </div>
    );
}
