import { NextResponse, NextRequest } from "next/server";

// 

import { prisma } from '@/lib/prisma'

// lib

import { uploadImage } from "@/lib/uploadImage";


export const GET = async () => {
  try {

    const banner = await prisma.banner.findMany()

    if (!banner) {
      return NextResponse.json({
        success: true,
        message: `Рекламный баннер получен. Путой массив`,
        data: null
      })
    }


    return NextResponse.json({
        success: true,
        message: `Рекламный баннер получен`,
        data: banner
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



export const POST = async (req: NextRequest, res: NextResponse) => {

  try {

    const data = await req.formData()

    console.log(data)

    const image = data.get('image') as File

    if (!image) {
      return NextResponse.json({
        success: false,
        message: `Пришло путое изображение`,
        data: null
      })
    }


    const uploadImageHandler = await uploadImage(image, `banner_${Date.now()}`, 'banner', 1120)
    console.log(uploadImageHandler)


    if (!uploadImageHandler?.success) {
      return NextResponse.json({
        success: false,
        message: `Баннен не добавлен ошибка ${uploadImageHandler?.message}`,
        data: null
      })
    }


    const newBanner = await prisma.banner.create({
      data: {
        image: uploadImageHandler.data as string
      }
    })

    console.log(`Баннер успешно добавлен: ${newBanner.id}`)

    return NextResponse.json({
      success: true,
      message: `Баннен успешно добавлен`,
      data: newBanner.id
    })


    
  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Ошибка загрузки баннера ${error.message}`)

      return NextResponse.json({
        success: false,
        message: `Ошибка загрузки баннера ${error.message}`,
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