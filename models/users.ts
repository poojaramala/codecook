import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    college:{
        type:String
    },
    company:{
        type:String
    }
})

const Users= mongoose.models.Users || mongoose.model('Users',userSchema)

export default Users