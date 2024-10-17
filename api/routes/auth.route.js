import express from 'express';
import { login, register,google, additionalDetails, additionalDetailsByEmail } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/google',google)
router.post('/additionaldetails', additionalDetails);
router.get('/additionaldetails/:email', additionalDetailsByEmail);
export default router;