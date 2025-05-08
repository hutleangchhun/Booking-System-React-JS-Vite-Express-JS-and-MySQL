import { Router } from "express";
import * as customerController from '../controllers/customerController.js';


const router = Router();

router.get('/customers/show', customerController.fetchAllCustomers);


export default router;