import { NextResponse, NextRequest } from "next/server";
import fs from 'fs'
import path from "path";

// 

import { prisma } from '@/lib/prisma'




//


const pathToFile = path.join(process.cwd(), 'src', 'json', 'comments.json')

export const GET = async () => {
  try {

    const comments = prisma.comment.findMany()

    if (!comments) {
      return NextResponse.json({
        success: false,
        message: `База Комментариев пуста`,
        data: comments
    })
    }

    return NextResponse.json({
        success: true,
        message: `Комментарии получены`,
        data: comments
    })
    
  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Оишкба получения новостей ${error.message}`)

      return NextResponse.json({
        success: false,
        message: `Оишкба получения новостей ${error.message}`,
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





export const POST = async (req: Request) => {

  try {
    
    const body = await req.json()

    if (!body) {
      return NextResponse.json({
        success: false,
        message: `Ошикба отправки комментариев нет данных`,
        data: null
      })
    }

    console.log('MESSAGE ', body)

    await prisma.comment.create({
      data: body
    })

    return NextResponse.json({
        success: true,
        message: `Комментарий создан`,
        data: body
    })


  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Оишкба получения новостей ${error.message}`)

      return NextResponse.json({
        success: false,
        message: `Оишкба получения новостей ${error.message}`,
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