import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/Icons/icons';
import { fetchAllBookings, deleteBooking } from '../../Service/bookingApi';
import { getUserRole } from '../../auth';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import ErrorMessage from '../../components/Error/ErrorMessage';
import Modal from '../../components/Modal/Modal';
import BookingForm from '../../components/Form/bookingForm';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [bookingToUpdate, setBookingToUpdate] = useState(null);

    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const data = await fetchAllBookings();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError(error.message || 'Failed to fetch bookings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRole(getUserRole());
        fetchBookings();
    }, []);

    // === MODAL CONTROL ===
    const openCreateModal = () => setIsCreateModalOpen(true);
    const handleUpdateBookingClick = (booking_id) => {
        const selected = bookings.find(b => b.booking_id === booking_id);
        setBookingToUpdate(selected);
        setIsUpdateModalOpen(true);
    };
    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setBookingToUpdate(null);
    };

    // === DELETE HANDLER ===
    const handleDelete = async (booking_id, guestName) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Delete booking for "${guestName}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
            });
            if (result.isConfirmed) {
                await deleteBooking(booking_id);
                setBookings(bookings.filter(b => b.id !== booking_id));
                Swal.fire('Deleted!', `Booking for ${guestName} has been deleted.`, 'success');
                fetchBookings();
            }
        } catch (error) {
            console.error('Delete error:', error);
            setError('Error deleting booking');
            Swal.fire('Error', 'Failed to delete booking.', 'error');
        }
    };

    // === PAGINATION ===
    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    const currentBookings = Array.isArray(bookings) ? bookings.slice(indexOfFirst, indexOfLast) : [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-base font-bold text-gray-700">List of Bookings</h1>
                {role === 'admin' && (
                    <button
                        onClick={openCreateModal}
                        className="rounded-full bg-blue-500 hover:bg-blue-700 text-white p-3 duration-300"
                    >
                        <Icon name="add" className="text-white text-lg" />
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
                    <thead className="bg-blue-400 bg-opacity-30 text-blue-600 text-sm">
                        <tr>
                            <th className="text-left p-3 border-b">Guest Name</th>
                            <th className="text-left p-3 border-b">Unit</th>
                            <th className="text-left p-3 border-b">Unit Type</th>
                            <th className="text-left p-3 border-b">Check-in</th>
                            <th className="text-left p-3 border-b">Check-out</th>
                            <th className="text-left p-3 border-b">Booking Date</th>
                            {role === 'admin' && (
                                <th className="p-3 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="font-medium text-gray-700 text-sm">
                        {currentBookings.map((booking) => (
                            <tr key={booking.booking_id} className="hover:bg-blue-50">
                                <td className="p-3">{booking.guest_name}</td>
                                <td className="p-3">{booking.unit_name}</td>
                                <td className="p-3">{booking.unit_type}</td>
                                <td className="p-3">{formatDate(booking.check_in_date)}</td>
                                <td className="p-3">{formatDate(booking.check_out_date)}</td>
                                <td className="p-3">{formatDate(booking.created_at)}</td>
                                {role === 'admin' && (
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleUpdateBookingClick(booking.booking_id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Icon name="update" className="text-lg" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log('Booking ID in Delete:', booking.booking_id);
                                                handleDelete(booking.booking_id, booking.guest_name);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Icon name="delete" className="text-xl" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalUsers={bookings.length}
                usersPerPage={bookingsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={closeModals}>
                <BookingForm mode="create" onSuccess={() => { closeModals(); fetchBookings(); }} />
            </Modal>

            {/* Update Modal */}
            <Modal isOpen={isUpdateModalOpen} onClose={closeModals}>
                <BookingForm mode="update" booking={bookingToUpdate} onSuccess={() => { closeModals(); fetchBookings(); }} />
            </Modal>
        </div>
    );
};

export default BookingList;
