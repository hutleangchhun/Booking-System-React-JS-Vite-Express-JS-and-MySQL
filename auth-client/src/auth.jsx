export const setToken = (token) => {
    localStorage.setItem('token', token);
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('role', payload.role);
    } catch (error) {
        console.error("Invalid token format");
    }
};
export const getToken = () => localStorage.getItem('token');

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
