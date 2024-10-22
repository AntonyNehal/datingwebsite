import express from 'express';
import { acceptFriendRequest, chat, deleteUser, deleteusers, getFriendRequests, getUserByEmail, getUsersByPreference, noofusers, search, sendFriendRequest, signout, test, updateUser} from '../controllers/user.controller.js';
const router=express.Router();


router.get('/test',test)
router.post('/update/:userId', updateUser); 
router.get('/:email', getUserByEmail);

router.delete('/delete/:userId',deleteUser);
router.post('/signout',signout);

router.get('/preference/:preference', getUsersByPreference);

router.get('/:userId/requests', getFriendRequests);
router.post('/send-request', sendFriendRequest);
router.post('/accept-request', acceptFriendRequest);
router.get('/:userId/friends',chat);
router.post('/search',search);

router.post('/all', noofusers); 
router.delete('/delete/:id', deleteusers);
export default router;