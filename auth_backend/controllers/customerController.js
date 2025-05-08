import * as customerModel from '../models/customerModel.js';
import { sendJsonResponse } from '../utils/utils.js';


export const fetchAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.fetchCustomer();
        sendJsonResponse(res, 200, { customers });
    } catch {
        sendJsonResponse(res, 500, { error: 'Failed to retrieve customers' });
    }
}

