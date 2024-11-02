
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test=(req,res)=>{
    res.send("working api");
}

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Password validation and hashing
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters long'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Username validation
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
        return next(errorHandler(400, 'Username can only contain letters and numbers'));
      }
    }

    // Prepare update fields
    const updateFields = {
      username: req.body.username,
      email: req.body.email,
    };

    if (req.body.password) {
      updateFields.password = req.body.password; // Only add password if provided
    }

    if (req.body.profilePicture) {
      updateFields.profilePicture = req.body.profilePicture; // Only add profile picture if provided
    }

    // Update the user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true });

    if (!updatedUser) {
      return next(errorHandler(404, 'Failed to update user'));
    }

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const getUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
      const user = await User.findOne({ email }); // Find user by email
      if (!user) {
          return res.status(404).send('User not found'); // Handle not found
      }
      res.json(user); // Return the user data
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server error'); // Handle server error
  }
};

export const deleteUser=async(req,res,next)=> {
  try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

export const signout=(req,res,next)=>{
  try{
    res.clearCookie('access_token').status(200).json('User has been signed Out');
  }
  catch(error){
    next(error);
  }
}
// export const userpreference = async (req, res, next) => {
//   try {
//     const { preference } = req.params;
//     console.log(`Received request with preference: ${preference}`); // Log preference

//     const genderFilter = preference === 'both' ? {} : { gender: preference };
//     const users = await User.find(genderFilter).select('-password');

//     if (users.length === 0) {
//       return res.status(404).json({ message: 'No users found.' }); // Return JSON error
//     }

//     res.status(200).json(users); // Send users as JSON
//   } catch (error) {
//     console.error('Error fetching users:', error.message);
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// export const userpreference = async (req, res, next) => {
//   try {
//       const { preference } = req.params;
//       console.log('Preference:', req.params.preference);

//       // Determine gender filter based on preference
//       const genderFilter = preference === 'both' ? {} : { gender: preference };

//       // Fetch users based on the filter, excluding their passwords
//       const users = await User.find(genderFilter).select('-password');

//       res.status(200).json(users);
//   } catch (error) {
//       res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// export const friendRequest = async (req, res, next) => {
//   const { senderId, receiverId } = req.body;
//   try {
//       const receiver = await User.findById(receiverId);
//       if (!receiver) return res.status(404).json({ message: 'User not found.' });

//       receiver.friendRequests.push(senderId); // Store sender's ID in receiver's friendRequests
//       await receiver.save();

//       res.status(200).json({ message: 'Friend request sent.' });
//   } catch (error) {
//       res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Route to accept a friend request
// export const acceptfriendRequest = async (req, res, next) => {
//   const { senderId, receiverId } = req.body;
//   try {
//       const sender = await User.findById(senderId);
//       const receiver = await User.findById(receiverId);

//       if (!sender || !receiver) return res.status(404).json({ message: 'User not found.' });

//       // Add each other as friends
//       sender.friends.push(receiverId);
//       receiver.friends.push(senderId);

//       // Remove the friend request
//       receiver.friendRequests = receiver.friendRequests.filter((id) => id !== senderId);
      
//       await sender.save();
//       await receiver.save();

//       res.status(200).json({ message: 'Friend request accepted.' });
//   } catch (error) {
//       res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

export const getUsersByPreference = async (req, res) => {
  try {
    const { preference } = req.params; // Get the preference from the request params

    // Find users matching the preference
    const users = await User.find({ gender: preference });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'User not found' });

    // Add the sender's ID to the receiver's friendRequests array
    if (!receiver.friendRequests.includes(senderId)) {
      receiver.friendRequests.push(senderId);
      await receiver.save();
    }

    res.status(200).json({ message: 'Friend request sent!' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
  const { receiverId, senderId } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) return res.status(404).json({ message: 'User not found' });

    // Add each other to friends list
    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    // Remove the friend request from receiver's list
    receiver.friendRequests = receiver.friendRequests.filter(reqId => reqId.toString() !== senderId);
    
    await receiver.save();
    await sender.save();

    res.status(200).json({ message: 'Friend request accepted!' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFriendRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friendRequests', 'firstName profilePicture'); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Backend Route
export const chat = async (req, res) =>{
  try {
    const user = await User.findById(req.params.userId).populate('friends', 'firstName profilePicture');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Search Endpoint
// Search Endpoint
export const search = async (req, res) => {
  const { username, interest, gender, birthday, height } = req.body;

  // Build query object based on provided search parameters
  const query = {};

  if (username) query.username = { $regex: username, $options: 'i' }; // Case-insensitive search
  if (interest) query.interests = { $in: [interest] }; // Match any interest in the array
  if (gender) query.gender = gender;

  // Handle age search from birthday
  if (birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birthday hasn't occurred this year yet, subtract 1 from the age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    query.birthday = { $gte: new Date(today.getFullYear() - age - 1, today.getMonth(), today.getDate()), $lte: new Date(today.getFullYear() - age, today.getMonth(), today.getDate()) };
  }

  // Handle height search
  if (height) {
    query.height = Number(height); // Exact height match
  }

  try {
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all users for admin panel
// export const noofusers = async (req, res) => {
//   try {
//       const users = await User.find();
//       res.json(users);
//   } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete a user
// export const deleteusers = async (req, res) =>{
//   try {
//       const userId = req.params.id;
//       await User.findByIdAndDelete(userId);
//       res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//       console.error('Error deleting user:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };

// Fetch all users
export const noofusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
} catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
}
};

// Delete user by ID
export const deleteusers = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameter
    const user = await User.findByIdAndDelete(id); // Delete user

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const totalusers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};
