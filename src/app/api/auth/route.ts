import { NextRequest, NextResponse } from "next/server";

// 

import jwt from 'jsonwebtoken'


export const POST = async (req: NextRequest) => {
  try {

    const data = await req.json()

    if (data.email !== process.env.ADMIN_EMAIL || data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({
        success: false,
        message: `Неверные имя пользователя или пароль`,
        data: null
      })
    }



    const token = jwt.sign({email: data.email}, process.env.SECRET_KEY as string, {
      expiresIn: 60 * 60
    })

    console.log(token)

    const response = NextResponse.json({
        success: true,
        message: `Админ успешно авторизован`,
        data: data.email
    })


    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
    })

    return response

    
  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Ошибка авторизации пользователя ${error.message}`)
      return NextResponse.json({
        success: false,
        message: `Ошибка авторизации пользователя ${error.message}`,
        data: null
      })
    }


    console.error(`Неизвестная ошибка ${error}`)

    return NextResponse.json({
      success: false,
      message: `Неизвестная ошибка ${error}`,
      data: null
    })

    
  }
}