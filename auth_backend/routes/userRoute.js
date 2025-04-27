import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/users/show', userController.showUser);
router.get('/users/all', userController.fetchAllUsers);
router.post('/users/create', userController.createUser);
router.put('/users/update', userController.updateUser);
router.delete('/users/delete', userController.deleteUser);

export default router;
