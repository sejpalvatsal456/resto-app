import { connectDB } from "@/app/db/db";
import { Restaurant } from "@/app/db/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { setCookies } from "@/libs/cookies";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const rest = await Restaurant.findOne({ email: email });
    if (!rest)
      return NextResponse.json({ msg: "User doesn't exist." }, { status: 409 });

    const passwordFromDB = rest.password;

    // if(await bcrypt.compare(password, passwordFromDB)) {
    //   const token = jwt.sign(rest, JWT_SECRET);
    //   await setCookies('token', token);
    //   return NextResponse.json({ msg: "OK" }, { status: 200 });
    // } else {
    //   return NextResponse.json({ msg: "Invalid password" }, { status: 401 });
    // }

    if (!(await bcrypt.compare(password, passwordFromDB)))
      return NextResponse.json({ msg: "Invalid password" }, { status: 401 });

    const token = jwt.sign({
      _id: rest._id,
      name: rest.name,
      email: rest.email,
      password: rest.password,
      city: rest.city,
      address: rest.address,
      contact: rest.contact
    }, JWT_SECRET);
    await setCookies("token", token);
    return NextResponse.json({ msg: "OK", compare: (await bcrypt.compare(password, passwordFromDB)) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error: error }, { status: 500 });
  }
};
