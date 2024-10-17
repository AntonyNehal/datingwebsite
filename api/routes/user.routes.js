import express from 'express';
import { getUserByEmail, test, updateAdditionalDetails, updateUser,} from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();

// Define the upload route
// router.post('/update/:userId',verifyToken,updateUser);
router.get('/test',test)
router.post('/update/:userId', updateUser); 
router.get('/:email', getUserByEmail);

// Route to update user details
router.post('/update/:id',updateAdditionalDetails);
export default router; 