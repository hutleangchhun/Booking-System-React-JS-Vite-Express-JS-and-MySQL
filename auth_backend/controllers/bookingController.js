import * as bookingModel from '../models/bookingModel.js';
import { sendJsonResponse } from '../utils/utils.js';



export const fetchAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.getAllBookings();
        sendJsonResponse(res, 200, { bookings });
    } catch {
        sendJsonResponse(res, 500, { error: 'Failed to retrieve bookings' });
    }
}

export const fetchCustomerBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.getCustomerBookings();
        sendJsonResponse(res, 200, { bookings });
    } catch {
        sendJsonResponse(res, 500, { error: 'Failed to retrieve bookings' });
    }
}

export const createBooking = async (req, res) => {
    const { customer_id, unit_id, guest_name, check_in_date, check_out_date } = req.body;

    if (!customer_id || !unit_id || !guest_name || !check_in_date || !check_out_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const bookingId = await bookingModel.createBooking(customer_id, unit_id, guest_name, check_in_date, check_out_date);
        return res.status(201).json({
            message: 'Booking created successfully',
            bookingId,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};


export const deleteBooking = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'Booking ID is required' });
    }
    try {
        const result = await bookingModel.deleteBooking(id);
        sendJsonResponse(res, 200, { message: 'Booking deleted', result });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
};