import connectDb from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";


 export async function POST(request:Request){
    await connectDb()
    const reqBody=await request.json()
     const user=await Users.findOne({userName:reqBody.userName})
     if(!user){
        return  NextResponse.json({msg:'there is no user with this username'})
     }
     
     if(user.password!= reqBody.password){
        return NextResponse.json({msg:'incorrect password'})
     }
     return NextResponse.json({msg:'both the username and password is correct'})
 }