import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const register = async (req, res, next) => {
  const { username, password, email } = req.body;

  // Check if all required fields are provided
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for existing user
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' }); // Conflict status
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' }); // Use 201 for created resource
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};
