import { Router } from "express";
import * as bookingController from '../controllers/bookingController.js';


const router = Router();

router.get('/booking/show', bookingController.fetchAllBookings);
router.get('/booking/customers', bookingController.fetchCustomerBookings);
router.post('/booking/create', bookingController.createBooking);
router.delete('/booking/delete', bookingController.deleteBooking);
router.get('/booking/count', bookingController.getBookingCount);


export default router;