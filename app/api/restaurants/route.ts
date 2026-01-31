import { connectDB } from "@/app/db/db";
import { Restaurant } from "@/app/db/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookies } from "@/libs/cookies";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const restaurants = await Restaurant.find();

    return NextResponse.json({ msg: "OK", data: restaurants }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Not OK" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { name, email, password, city, address, contact } = await req.json();

    const rest = await Restaurant.findOne({ email: email });
    if (rest) {
      return NextResponse.json(
        { msg: "Restaurant Already Exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRestData = {
      name: name,
      email: email,
      password: hashedPassword,
      city: city,
      address: address,
      contact: contact
    };
    // console.log(newRestData);
    const newRest = await Restaurant.create(newRestData);

    const token = jwt.sign(newRestData, JWT_SECRET);
    await setCookies("token", token);
    console.log(token);

    return NextResponse.json({ msg: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Internal Server Error", error: error }, { status: 500 });
  }
};
