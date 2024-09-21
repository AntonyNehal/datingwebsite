import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
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
export const login=async(req,res,next)=>{
  const {username,password}=req.body;
  if(!username||!password||username===''||password==='')
  {
    next(errorHandler(400,'All fields are required'));
  }
  try{
    const validUser=await User.findOne({username});
    if(!validUser){
      return next(errorHandler(404,'User not found'));
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(400,'Invalid username or password'));
    }
    const token=jwt.sign(
      {id:validUser._id},'secretkey');

      const {password:pass,...rest}=validUser._doc

      res.status(200).cookie('access_token',token,{
        httpOnly:true,}).json(rest);
  }
  catch(err){
    next(err);
  }
}