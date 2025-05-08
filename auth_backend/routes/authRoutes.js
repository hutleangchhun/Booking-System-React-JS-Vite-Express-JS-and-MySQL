import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);


router.get('/admin', auth, role(['admin']), (req, res) => res.send('Welcome Admin'));
router.get('/user', auth, role(['admin', 'user']), (req, res) => res.send('Welcome User'));

export default router;
