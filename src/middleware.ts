import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 

import { jwtVerify } from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value


  if (request.nextUrl.pathname === '/admin' && !token) {
    return NextResponse.redirect(new URL('/admin/auth', request.url)) 
  }


  if (request.nextUrl.pathname === '/admin/auth' && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (request.nextUrl.pathname === '/admin' && token) {

        try {
          
          const secret = new TextEncoder().encode(process.env.SECRET_KEY)

          const { payload } = await jwtVerify(token, secret)
          console.log('Токен валидный')
          
        } catch (error) {
          console.log('Токен не валидный')
          return NextResponse.redirect(new URL('/admin/auth', request.url)) 
        }


  }

  return NextResponse.next()


}
 
