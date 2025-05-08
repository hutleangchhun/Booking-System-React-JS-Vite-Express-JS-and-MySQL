import React, { useState, useEffect } from 'react';
import { createBooking, updateBooking } from '../../Service/bookingApi';
import { fetchAllCustomers } from '../../Service/customerApi';
import { fetchAllUnits } from '../../Service/unitApi';
import Swal from 'sweetalert2';

const BookingForm = ({ mode, booking = {}, onSuccess }) => {
    const [formData, setFormData] = useState({
        customer_id: '',
        unit_id: '',
        check_in: '',
        check_out: '',
        guest_name: '',
    });

    const [customers, setCustomers] = useState([]);
    const [units, setUnits] = useState([]);

    const formatDateForInput = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date - tzOffset).toISOString().slice(0, 16);
    };


    useEffect(() => {
        const loadData = async () => {
            try {
                const customerData = await fetchAllCustomers();
                const unitData = await fetchAllUnits();
                setCustomers(Array.isArray(customerData) ? customerData : []);
                setUnits(Array.isArray(unitData) ? unitData : []);
            } catch (err) {
                console.error("Error loading customers or units:", err);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (mode === 'update' && booking) {
            // Try to find unit_id based on unit_name
            const matchedUnit = units.find(u => u.unit_name === booking.unit_name);

            setFormData({
                customer_id: booking.customer_id || '',
                unit_id: matchedUnit?.id || '', // fallback if unit_id is missing
                check_in: formatDateForInput(booking.check_in_date) || '',
                check_out: formatDateForInput(booking.check_out_date) || '',
                guest_name: booking.guest_name || '',
            });
        }
    }, [mode, booking, units]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { customer_id, unit_id, check_in, check_out, guest_name } = formData;

        // Ensure all required fields are filled
        if (!customer_id || !unit_id || !check_in || !check_out || !guest_name) {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }

        try {
            if (mode === 'create') {
                await createBooking({
                    customer_id,
                    unit_id,
                    guest_name,
                    check_in_date: check_in,
                    check_out_date: check_out,
                });

                Swal.fire('Success!', 'Booking created successfully.', 'success');
            } else if (mode === 'update') {
                await updateBooking(booking.id, formData);
                Swal.fire('Updated!', 'Booking updated successfully.', 'success');
            }
            onSuccess();
        } catch (error) {
            console.error(`${mode} error:`, error);
            Swal.fire('Error', `Failed to ${mode} booking.`, 'error');
        }
    };

    return (
        <>
            <h1 className='text-base font-bold mb-5 pb-2 capitalize text-gray-700 border-b-2 border-gray-300'>
                {mode === 'create' ? 'Add New Booking' : 'Update Booking'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
                {/* Customer Dropdown */}
                <div className='grid grid-cols-2 gap-6'>
                    <div className=''>
                        <label className="block text-gray-700 font-semibold mb-2">Customer</label>
                        <select
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent p-2 rounded focus:outline-none"
                            required
                        >
                            <option value="">Select Customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.username}({customer.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Unit Dropdown */}
                    <div className=''>
                        <label className="block text-gray-700 font-semibold mb-2">Unit</label>
                        <select
                            name="unit_id"
                            value={formData.unit_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 bg-transparent p-2 rounded focus:outline-none"
                            required
                        >
                            <option value="">Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.unit_name} ({unit.unit_type})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Guest Name */}
                <div className='mb-4'>
                    <label className="block text-gray-700 font-semibold mb-2">Guest Name</label>
                    <input
                        type="text"
                        name="guest_name"
                        value={formData.guest_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                {/* Check-in Date and Time */}
                <div className='mb-4'>
                    <label className="block text-gray-700 font-semibold mb-2">Check-in</label>
                    <input
                        type="datetime-local"
                        name="check_in"
                        value={formData.check_in}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                {/* Check-out Date and Time */}
                <div className='pb-4'>
                    <label className="block text-gray-700 font-semibold mb-2">Check-out</label>
                    <input
                        type="datetime-local"
                        name="check_out"
                        value={formData.check_out}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 duration-300"
                >
                    {mode === 'create' ? 'Create Booking' : 'Update Booking'}
                </button>
            </form>
        </>
    );
};

export default BookingForm;
