import * as systeminformation from '../controllers/systemInformationController.js';
import Router from 'express';

const router = Router();

router.get('/system', systeminformation.getSystemInfo)

export default router;