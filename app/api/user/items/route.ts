import { connectDB } from "@/app/db/db";
import { Item } from "@/app/db/models";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest, ) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter');

    // filter - all, tag, price, location
    const items = await Item.find();

    return NextResponse.json(
      { data: items },
      { status: 200 }
    )

  } catch (error) {
    // dev mode only!!!!!!!!!!!!!!!!!!!!!!!
    console.log(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
};