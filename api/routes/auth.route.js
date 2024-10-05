import express from 'express';
import { login, register,google, additionalDetails } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/google',google)
router.post('/additionaldetails',additionalDetails);
export default router;