import { connectDB } from "@/app/db/db";
import { User } from "@/app/db/models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setCookies } from "@/libs/cookies";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async(req:NextRequest) => {
    try {
        
        await connectDB();

        const { email, password } = await req.json();

        const user = await User.findOne({ email: email });
        if(!user)
            return NextResponse.json({ msg: "User with this email does not exist." }, { status: 404 });

        const passwordFromDB = user.password;
        if(await bcrypt.compare(password, passwordFromDB)) {
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                address: user.address,
                city: user.city,
                contact: user.contact
            }, JWT_SECRET);

            await setCookies("user_token", token);
            return NextResponse.json({ msg: "OK" }, { status: 200 });
        } else {
            return NextResponse.json({ msg: "Incorrect Password" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ msg:"Internal Serve Error" }, { status: 500 });
    }
}