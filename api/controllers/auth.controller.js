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
// 
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password || username === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid username or password'));
    }
    const profilePicture = validUser.profilePicture;
    const token = jwt.sign(
      { id: validUser._id }, validUser.email,'secretkey'
    );

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).cookie('access_token', token, {
      httpOnly: true,
    }).json({ ...rest, profilePicture }); // Return profile picture
  } catch (err) {
    next(err);
  }
};

//google auth
// Google Auth
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, 'secretkey');
      const { password, ...rest } = user._doc;
      // Return response for existing user
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json({ isNewUser: false, ...rest }); // Indicate existing user
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, 'secretkey');
      const { password, ...rest } = newUser._doc;
      // Return response for new user
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json({ isNewUser: true, ...rest }); // Indicate new user
    }
  } catch (error) {
    console.error('Error in Google Auth:', error);
    next(error);
  }
};

//additionaldetails
// Additional Details
export const additionalDetails = async (req, res) => {
  try {
    const { email, firstName, birthday, gender, height, interests } = req.body;

    // Find and update the user by email
    const user = await User.findOneAndUpdate(
      { email },
      { firstName, birthday, gender, height, interests },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return the updated user details
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};