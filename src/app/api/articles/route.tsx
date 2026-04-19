import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// JSON

import newsJSON from '@/json/news.json' with {type: 'json'}

// 

export const GET = async () => {

  try {

    return NextResponse.json({
        success: true,
        message: `Новости получены`,
        data: newsJSON
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


export const POST = async (req: NextRequest) => {
  try {

    const { title, description, image } = await req.json()

    if (!title || !description || !image) {

      return NextResponse.json({
        success: false,
        message: `Пожалуйста, заполните все поля`,
        data: null
      })
    }


    const newArticle = await prisma.articles.create({
      data: {
        title,
        description,
        image
      }
    })

    console.log(`Новость успешно создана: ${newArticle.id}`)

    return NextResponse.json({
      success: true,
      message: `Новость успешно создана`,
      data: newArticle
    })


  
    
  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Оишкба создания новости ${error.message}`)

      return NextResponse.json({
        success: false,
        message: `Оишкба создания новости ${error.message}`,
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