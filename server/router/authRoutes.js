import express from 'express';
import { getUserProfile, login, logout, register } from '../controllers/authController.js';
import { isAuthenticatedUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/me',isAuthenticatedUser, getUserProfile)
router.get('/logout',isAuthenticatedUser, logout)
export default router;