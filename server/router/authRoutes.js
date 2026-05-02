import express from 'express';
import { getUserProfile, login, logout, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/me', getUserProfile)
router.get('/logout', logout)
export default router;