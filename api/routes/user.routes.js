import express from 'express';
import { deleteUser, getUserByEmail, signout, test, updateAdditionalDetails, updateUser} from '../controllers/user.controller.js';
const router=express.Router();

// Define the upload route
// router.post('/update/:userId',verifyToken,updateUser);
router.get('/test',test)
router.post('/update/:userId', updateUser); 
router.get('/:email', getUserByEmail);

// Route to update user details
router.post('/update/:id',updateAdditionalDetails);
router.delete('/delete/:userId',deleteUser);
router.post('/signout',signout)
export default router; 