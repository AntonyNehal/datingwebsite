import express from 'express';
import { acceptFriendRequest, chat, deleteUser, getFriendRequests, getUserByEmail, getUsersByPreference, search, sendFriendRequest, signout, test, updateUser} from '../controllers/user.controller.js';
const router=express.Router();

// Define the upload route
// router.post('/update/:userId',verifyToken,updateUser);
router.get('/test',test)
router.post('/update/:userId', updateUser); 
router.get('/:email', getUserByEmail);

// Route to update user details
// router.post('/update/:id',updateAdditionalDetails);
router.delete('/delete/:userId',deleteUser);
router.post('/signout',signout);


// router.get('/:preference',userpreference);
// router.post('/friend-request',friendRequest);
// router.post('/accept-friend-request',acceptfriendRequest);
router.get('/preference/:preference', getUsersByPreference);

router.get('/:userId/requests', getFriendRequests);
router.post('/send-request', sendFriendRequest);
router.post('/accept-request', acceptFriendRequest);
router.get('/:userId/friends',chat);
router.post('/search',search);
export default router;