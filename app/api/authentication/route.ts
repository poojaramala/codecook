import connectDb from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    await connectDb();
    const reqBody= await request.json()
    const exists=await Users.findOne({userName:reqBody.userName})  
    if(exists){
        return NextResponse.json({msg:'user already exists'})
    }  
    const user=await Users.create(reqBody)
    return NextResponse.json({msg:'user created successfully',data:user})
}