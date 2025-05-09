import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/booking',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Handle errors consistently
// Base function that handles all cases
export const handleAxiosError = (error, fallbackMessage) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || fallbackMessage;

        if (status === 404) return `${fallbackMessage} — Not found (404)`;
        if (status === 500) return `${fallbackMessage} — Server error (500)`;
        if (status === 403 || status === 401) return `${fallbackMessage} — Unauthorized`;
        if (status === 409) return `${fallbackMessage} — Conflict: ${message}`;

        return `${fallbackMessage} — (${status}) ${message}`;
    } else if (error.request) {
        return 'No response from server. Please check your network connection.';
    } else {
        return `Request error: ${error.message}`;
    }
};

// Wrapper that uses the full handler (can be renamed or customized as needed)
export const handleAxiosErr = handleAxiosError;

// === User API Methods ===

// Fetch all
export const fetchAllBookings = async () => {
    try {
        const res = await api.get('customers');
        return res.data.bookings;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch Bookings'));
    }
};

// Delete
export const deleteBooking = async (id) => {
    try {
        const res = await api.delete(`delete?id=${id}`);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to delete Bookings'));
    }
};

export const createBooking = async (bookingData) => {
    try {
        const res = await api.post('create', bookingData);
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to create Booking'));
    }
};

export const updateBooking = async (id) => {

}