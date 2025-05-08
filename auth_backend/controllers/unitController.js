import * as unitModel from '../models/unitModel.js';
import { sendJsonResponse } from '../utils/utils.js'; // Utility to send JSON responses

export const showUnit = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return sendJsonResponse(res, 400, { error: 'Unit ID is required' });
    }

    try {
        const unit = await unitModel.getUnitById(id);
        sendJsonResponse(res, 200, { unit });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
}

export const fetchAllUnits = async (req, res) => {
    try {
        const units = await unitModel.fetchAllUnit();
        sendJsonResponse(res, 200, { units });
    } catch {
        sendJsonResponse(res, 500, { error: 'Failed to retrieve units' });
    }
}

export const deleteUnit = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return sendJsonResponse(res, 400, { error: 'Unit ID is required' });
    }

    try {
        await unitModel.deleteUnit(id);
        sendJsonResponse(res, 200, { message: 'Unit deleted' });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err });
    }
};

//Count all users
export const getUnitCount = async (req, res) => {
    try {
        const results = await unitModel.countAllUnits();
        const count = results[0]?.total || 0;
        res.json({ count });
    } catch (err) {
        console.error('Error fetching units count:', err);
        res.status(500).json({ message: 'Failed to count units' });
    }
};

export const getAvailableUnits = async (req, res) => {
    try {
        const results = await unitModel.avialableUnits();
        const count = results[0]?.total || 0;
        res.json({ count });
    } catch (err) {
        console.error('Error fetching units count:', err);
        res.status(500).json({ message: 'Failed to count units' });
    }
};
export const createUnit = async (req, res) => {
    const { unit_name, unit_type, price_per_night, capacity, availability, image_url, description } = req.body;
    if (
        unit_name === undefined || unit_type === undefined ||
        price_per_night === undefined || capacity === undefined ||
        availability === undefined || image_url === undefined ||
        description === undefined
    ) {
        return sendJsonResponse(res, 400, { error: 'Missing required fields' });
    }
    try {
        const unitId = await unitModel.createUnit(
            unit_name,
            unit_type,
            price_per_night,
            capacity,
            availability,
            image_url,
            description
        );
        sendJsonResponse(res, 201, { message: 'Unit created', unitId });
    } catch (err) {
        console.error('Error in createUnit:', err);
        sendJsonResponse(res, 500, { error: 'Failed to create unit' });
    }
};

export const updateUnit = async (req, res) => {
    const { id } = req.query;
    const { unit_name, unit_type, price_per_night, capacity, availability, image_url, description } = req.body;

    if (!unit_name || !unit_type || !price_per_night || !capacity || availability === undefined || !image_url || !description) {
        return sendJsonResponse(res, 400, { error: 'Missing required fields' });
    }

    try {
        await unitModel.updateUnit(id, unit_name, unit_type, price_per_night, capacity, availability, image_url, description);
        sendJsonResponse(res, 200, { message: 'Unit updated successfully' });
    } catch (err) {
        sendJsonResponse(res, 500, { error: 'Failed to update unit', details: err });
    }
};
