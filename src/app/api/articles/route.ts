import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// lib

import { uploadImage } from "@/lib/uploadImage";

// JSON

import newsJSON from '@/json/news.json' with {type: 'json'}

// 

export const GET = async () => {

  try {

    const allArticles = await prisma.articles.findMany()
    if (!allArticles) {
      return NextResponse.json({
        success: true,
        message: `Новости получены. пустой массив`,
        data: []
      })
    }

    return NextResponse.json({
        success: true,
        message: `Новости получены`,
        data: allArticles
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


    const data = await req.formData() as FormData
    

    const title = data.get('title') as string
    const description = data.get('description') as string
    const image = data.get('image') as File


    const imageUploadResult = await uploadImage(image, `article_${Date.now()}`, 'articles', 360)
    console.log('Результат загрузки изображения:', imageUploadResult)

    if (!imageUploadResult?.success) {
      return NextResponse.json({
        success: false,
        message: `Оишкба создания новости`,
        data: null
      })
    }

    const newArticle = await prisma.articles.create({
      data: {
        title,
        description,
        image: imageUploadResult.data as string
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


