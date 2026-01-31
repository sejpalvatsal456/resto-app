"use server";

import { connectDB } from "@/app/db/db";
import { Item } from "@/app/db/models";
import { getCookies } from "@/libs/cookies";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET =  new TextEncoder().encode(process.env.JWT_SECRET);

export const GET = async(req: NextRequest) => {

  try {
    
    await connectDB();
    const token = await getCookies("token");
    if(!token)
      return NextResponse.json({ msg: "Authorization failed" }, { status: 401 });
    const restId = (await jwtVerify(token, JWT_SECRET)).payload._id;

    const items = await Item.find({ restId: restId });

    return NextResponse.json({ data: items }, { status: 200 });


  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }

}

export const POST = async(req: NextRequest) => {
  try {
    
    await connectDB();
    const token = await getCookies("token");
    if(!token)
      return NextResponse.json({ msg: "Authorization failed" }, { status: 401 });
    const restId = (await jwtVerify(token, JWT_SECRET)).payload._id;

    const { name, imgUrl, price, desc } = await req.json();

    const newItem = await Item.create({ restId, name, imgUrl, price, desc });

    if(!newItem)
      return NextResponse.json({ msg: "Error in adding new item" }, { status: 500 });

    return NextResponse.json({ msg: "OK" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: "internal Server Error", err: error }, { status: 500 });
  }
}

export const PUT = async(req:NextRequest) => {
  try {
    
    await connectDB();
    const editItem = await req.json();

    await Item.findByIdAndUpdate(editItem._id, editItem);

    return NextResponse.json({ data: editItem }, { status: 200 });


  } catch (error) {
    return NextResponse.json({ msg: "internal Server Error", err: error }, { status: 500 });
  }
}

export const DELETE = async(req:NextRequest) => {
  
  try {
    
    await connectDB();
    const { itemId } = await req.json();

    console.log(itemId);

    await Item.findByIdAndDelete(itemId);

    return NextResponse.json({ msg: "OK" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ msg: "internal Server Error", err: error }, { status: 500 });
  }

}