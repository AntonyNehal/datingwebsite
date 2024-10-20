import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://www.bing.com/images/search?view=detailV2&ccid=yYUwl3GD&id=49F41A96F221BAF59B0449DD7E92A80307C915A9&thid=OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa&mediaurl=https%3a%2f%2fociacc.com%2fwp-content%2fuploads%2f2019%2f03%2fblank-profile-picture-973460_1280-1030x1030.png&exph=1030&expw=1030&q=Blank+Profile&simid=608010719680269138&FORM=IRPRST&ck=7F6891A4DDB5888490A4F4D386EEBD65&selectedIndex=9&itb=0",
    },
    firstName:{
        type:String,
    },
    birthday:{
        type:Date,
    },
    gender:{
        type:String,
    },
    height:{
        type:Number,
    },
    interests:{
        type:[String],
    },
    image: {
        type: String,
    },
    preference: { 
        type: String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);
const User=mongoose.model('User',userSchema);
export default User;

