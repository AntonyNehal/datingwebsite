import express from 'express';
import { test, updateAdditionalDetails, updateUser,} from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();

// Define the upload route
// router.post('/update/:userId',verifyToken,updateUser);
router.get('/test',test)
router.post('/update/:userId', updateUser); 
router.post('/update/:id', updateAdditionalDetails);
export default router; 