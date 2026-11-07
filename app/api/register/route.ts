import { connectDB } from "@/lib/mongodb";
import users from "@/models/userModel"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

//register controller function: POST
export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const { name, email, password } = await req.json()
        const existinguser = await users.findOne({ email })
        if (existinguser) {
            return NextResponse.json({ message: "User Already Exist !! Please Login!!!!", data: {} }, { status: 400 })
        } else {
            const encryptPassword = await bcrypt.hash(password, 10)
            const newuser = await users.create({
                name, email, password: encryptPassword
            })
            return NextResponse.json({ message: "User Register Successfully", data: newuser }, { status: 201 })
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went Wrong!!", data: {} }, { status: 500 })
    }
}