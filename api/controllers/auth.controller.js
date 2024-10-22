import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";;
import jwt from "jsonwebtoken";
//register
export const register = async (req, res, next) => {
  const { username, password, email } = req.body;

 
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

 
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' }); 
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' }); 
  } catch (err) {
    next(err); 
  }
};

//login
// // 
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  
  // Check if both fields are provided
  if (!username || !password || username === '' || password === '') {
    return next(errorHandler(400, 'All fields are required')); // Return here to prevent further execution
  }

  try {
    // Find user by username
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, 'User not found')); // Return here as well
    }

    // Compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid username or password')); // Return on error
    }

    const profilePicture = validUser.profilePicture;

    // Sign the JWT with user ID and any additional information you want
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email }, // Include email in the payload
      'secretkey', // Your secret key
      { expiresIn: '1h' } // Optional: Set token expiration
    );

    const { password: pass, ...rest } = validUser._doc;

    // Send response
    res.status(200)
      .cookie('access_token', token, { httpOnly: true }) // Set cookie with the token
      .json({ ...rest, profilePicture }); // Return user data and profile picture
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

// //google auth
// // Google Auth
// export const google = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, 'secretkey');
//       const { password, ...rest } = user._doc;
//       // Return response for existing user
//       res.status(200).cookie('access_token', token, {
//         httpOnly: true,
//       }).json({ isNewUser: false, ...rest }); // Indicate existing user
//     } else {
//       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username: name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),
//         email,
//         password: hashedPassword,
//         profilePicture: googlePhotoUrl,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, 'secretkey');
//       const { password, ...rest } = newUser._doc;
//       // Return response for new user
//       res.status(200).cookie('access_token', token, {
//         httpOnly: true,
//       }).json({ isNewUser: true, ...rest }); // Indicate new user
//     }
//   } catch (error) {
//     console.error('Error in Google Auth:', error);
//     next(error);
//   }
// };
// export const login = async (req, res, next) => {
//   const { username, password } = req.body;

//   // Check if both fields are provided
//   if (!username || !password) {
//     return next({ status: 400, message: 'All fields are required' });
//   }

//   try {
//     const validUser = await User.findOne({ username });
//     if (!validUser) {
//       return next({ status: 404, message: 'User not found' });
//     }

//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next({ status: 400, message: 'Invalid username or password' });
//     }

//     // Generate JWT with user ID, email, and isAdmin
//     const token = jwt.sign(
//       { id: validUser._id, email: validUser.email, isAdmin: validUser.isAdmin },
//       'secretkey',
//       { expiresIn: '1h' }
//     );

//     const { password, ...userData } = validUser._doc;

//     // Send response with token and user data
//     res.status(200)
//       .cookie('access_token', token, { httpOnly: true })
//       .json({ ...userData });
//   } catch (error) {
//     next(error);
//   }
// };
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Generate JWT with user ID, email, and isAdmin
      const token = jwt.sign(
        { id: user._id, email: user.email, isAdmin: user.isAdmin },
        'secretkey',
        { expiresIn: '1h' }
      );

      const { password, ...userData } = user._doc;
      return res.status(200).cookie('access_token', token, { httpOnly: true })
        .json({ isNewUser: false, ...userData });
    } else {
      // Generate random password for new users
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        isAdmin: false, // New users are not admins by default
      });

      await newUser.save();

      // Generate JWT for new user
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
        'secretkey',
        { expiresIn: '1h' }
      );

      const { password, ...userData } = newUser._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true })
        .json({ isNewUser: true, ...userData });
    }
  } catch (error) {
    console.error('Error in Google Auth:', error);
    next(error);
  }
};

//additionaldetails
export const additionalDetailsByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from route params
    const user = await User.findOne({ email }); // Find user by email

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const additionalDetails = async (req, res) => {
  try {
    const { email, firstName, birthday, gender, height, interests, image, preference } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email }, // Find user by email
      { firstName, birthday, gender, height, interests, image, preference }, // Update user details
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return updated user details
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};