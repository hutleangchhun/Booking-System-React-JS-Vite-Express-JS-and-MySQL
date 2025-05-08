export const setToken = (token) => {
    localStorage.setItem('token', token);
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('role', payload.role);
        localStorage.setItem('username', payload.username);  // Store username in localStorage
    } catch (error) {
        console.error("Invalid token format");
    }
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
};


export const getUserRole = () => {
    const role = localStorage.getItem('role');
    if (role) return role;

    const token = getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    } catch {
        return null;
    }
};
export const getUserName = () => {
    const username = localStorage.getItem('username');
    if (username) return username;

    const token = getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
    } catch {
        return null;
    }
};
export const getUserInfo = () => {
    const token = getToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.id,
            email: payload.email,
            username: payload.username,
            role: payload.role
        };
    } catch {
        return null;
    }
};

