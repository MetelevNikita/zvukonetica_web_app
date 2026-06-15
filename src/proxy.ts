
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function proxy (request: NextRequest) {

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const pathName = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value


    const isAdminRoute = pathName.startsWith('/admin')
    const isAuthRoute = pathName === '/admin/auth'



    if (isAdminRoute && !isAuthRoute && !token) {
        return NextResponse.redirect(new URL('/admin/auth', request.url))
    }

    if (!token) {
      return NextResponse.next()
    }

    try {
      
      const varifyToken = await jwtVerify(token, secret)
      if (varifyToken.payload.role !== 'admin') {
        return NextResponse.redirect(new URL("/admin/auth", request.url));
      }

      if (isAuthRoute && varifyToken.payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }


      return NextResponse.next()

    } catch (error) {
      console.log("Invalid token", error);
      return NextResponse.redirect(new URL("/admin/auth", request.url));
    }

}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
}