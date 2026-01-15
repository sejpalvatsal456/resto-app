import { NextRequest, NextResponse } from "next/server";
import { getCookies } from "./libs/getCookies";
import { jwtVerify } from "jose";
import { deleteCookies } from "./libs/deleteCookies";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  

  if(pathname.includes('/restaurant')) {
    const token = (await getCookies("token"));
    if(pathname !== '/restaurant/auth') {
      if(!token) {
        return NextResponse.redirect(new URL('/restaurant/auth', req.url));
      }
      try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.next();
      } catch (error) {
        await deleteCookies("token");
        return NextResponse.redirect(new URL('/restaurant/auth', req.url));
      }
    }

    if(pathname === '/restaurant/auth') {
      if(token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL('/restaurant', req.url));
        } catch (error) {
          await deleteCookies("token");
          return NextResponse.next();
        }
      }
    }
  } else if (pathname.includes('/user')) {
    const token = (await getCookies("user_token"));
    if (pathname === '/user/auth') {
      if(token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL('/', req.url));
        } catch (error) {
          await deleteCookies("user_token");
          return NextResponse.next();
        }
      }
    }
  } else {
    const token = (await getCookies("user_token"));
    if(!token) {
      return NextResponse.redirect(new URL('/user/auth', req.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next();
    } catch (error) {
      await deleteCookies("user_token");
      return NextResponse.redirect(new URL('/user/auth', req.url));
    }
  }
  
  

}

export const config = {
  matcher: ['/restaurant', '/restaurant/auth',  '/', '/user/auth']
};