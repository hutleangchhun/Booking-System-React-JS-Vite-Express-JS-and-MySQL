import { Router } from "express";
import * as unitController from '../controllers/unitController.js';


const router = Router();

router.get('/units/show', unitController.showUnit);
router.get('/units/all', unitController.fetchAllUnits);
router.delete('/units/delete', unitController.deleteUnit);
router.get('/units/count', unitController.getUnitCount);
router.get('/units/available', unitController.getAvailableUnits);
router.post('/units/create', unitController.createUnit);
router.put('/units/update', unitController.updateUnit);


export default router;