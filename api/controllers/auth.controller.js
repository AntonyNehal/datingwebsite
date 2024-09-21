import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
export const register=async (req,res) => {
    const {username,password,email}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({
    username,
    email,
    password:hashedPassword,
    });

    try{
        await newUser.save();
        res.send("register succesful");
    }
    catch(err){
        res.status(500).send(err.message);
    }
};