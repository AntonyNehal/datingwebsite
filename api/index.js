import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
mongoose.connect('mongodb+srv://nehal:Nehal123%40@datingapp.7l7qk.mongodb.net/datingapp?retryWrites=true&w=majority&appName=datingapp')
.then(()=>{
    console.log('mongo connected');
})
.catch(err=>{
    console.log(err);
})
const app=express();
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.listen(3000,()=>{
    console.log('server on 3000');
});

app.use((err,req,res,next) => {
    const statusCode=err.statuscode|| 500;
    const message=err.message ||'Internal Server Error';
    res.status(statusCode).send({
        success:false,
        statusCode,
        message
    })
});