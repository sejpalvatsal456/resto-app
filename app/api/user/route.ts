import { connectDB } from "@/app/db/db";
import { User } from "@/app/db/models";
import { NextRequest, NextResponse } from "next/server";
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setCookies } from "@/libs/setCookies";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async(req: NextRequest) => {
    try {
        
        await connectDB();

        const { name, email, password, city, address, contact } = await req.json();

        const oldUser = await User.findOne({ email: email });
        if(oldUser)
            return NextResponse.json({ msg: "User with this Email Already Exist." }, { status: 409 });

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = await User.create({ 
            name: name,
            email: email,
            password: hashedPassword,
            city: city,
            address: address,
            contact: contact
        });

        if(!newUser)
            return NextResponse.json({ msg: "Internal server Error", error: "Error in creating new User" }, { status: 500 });

        const token = jwt.sign({
            name: name,
            email: email,
            city: city,
            address: address,
            contact: contact
        }, JWT_SECRET);

        await setCookies("user_token", token);
        console.log({ name, email, password, city, address, contact });
        return NextResponse.json({ token: token }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: "Internal server Error", error: error }, { status: 500 });
    }
}