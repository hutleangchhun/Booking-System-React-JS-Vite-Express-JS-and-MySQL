import { connection } from '../config/db.js';


export const getAllBookings = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM bookings';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
export const getCustomerBookings = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                c.id AS customer_id,
                c.username,
                c.email,
                b.id AS booking_id,
                b.guest_name,
                b.check_in_date,
                b.check_out_date,
                b.created_at,
                u.unit_name,
                u.unit_type
            FROM bookings b
            JOIN customers c ON b.customer_id = c.id
            JOIN units u ON b.unit_id = u.id;
        `;
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const createBooking = (customer_id, unit_id, guest_name, check_in_date, check_out_date) => {
    return new Promise((resolve, reject) => {
        // Insert the booking
        const insertQuery = `
            INSERT INTO bookings (customer_id, unit_id, guest_name, check_in_date, check_out_date)
            VALUES (?, ?, ?, ?, ?);
        `;

        connection.query(insertQuery, [customer_id, unit_id, guest_name, check_in_date, check_out_date], (err, result) => {
            if (err) {
                console.error('Error Booking:', err); // helpful logging
                return reject(err);
            }

            // If booking inserted successfully, proceed to update unit availability
            const bookingId = result.insertId;
            const updateQuery = 'UPDATE units SET availability = 0 WHERE id = ?';

            // Make sure to update the unit's availability only after the booking insertion
            connection.query(updateQuery, [unit_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating unit availability:', updateErr);
                    return reject(updateErr); // Reject if updating unit fails
                }

                // Successfully created the booking and updated unit availability
                resolve(bookingId);
            });
        });
    });
};

export const deleteBooking = (id) => {
    return new Promise((resolve, reject) => {
        // 1. Get the unit_id from the booking
        const getUnitQuery = 'SELECT unit_id FROM bookings WHERE id = ?';
        connection.query(getUnitQuery, [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error('Booking not found'));

            const unit_id = results[0].unit_id;

            // 2. Delete the booking
            const deleteQuery = 'DELETE FROM bookings WHERE id = ?';
            connection.query(deleteQuery, [id], (deleteErr, deleteResult) => {
                if (deleteErr) return reject(deleteErr);

                // 3. Update unit availability
                const updateQuery = 'UPDATE units SET availability = 1 WHERE id = ?';
                connection.query(updateQuery, [unit_id], (updateErr) => {
                    if (updateErr) return reject(updateErr);

                    resolve({ deletedBookingId: id, updatedUnitId: unit_id });
                });
            });
        });
    });
};
