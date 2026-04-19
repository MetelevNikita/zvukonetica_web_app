import { NextResponse, NextRequest } from "next/server"

// lib

import { deleteFile } from "@/lib/deleteFile"

// 

import { prisma } from '@/lib/prisma'

export const DELETE = async (req: NextRequest, context: {params: {id: string}}) => {
  try {

    const {id} = await context.params
    console.log(id)

    const findBanner = await prisma.banner.findFirst({
      where: {
        id: parseInt(id)
      }
    })


    if (!findBanner) {
      return NextResponse.json({
        success: false,
        message: 'Не найдена баннер для удаления'
      })
    }


    const deleteFileHandler = await deleteFile(findBanner.image)
    console.log(deleteFileHandler)

    await prisma.banner.delete({
      where: {
        id: parseInt(id)
      }
    })

    return NextResponse.json({
      message: 'DELETE'
    })
    
  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Оишкба удаления новости ${error.message}`)

      return NextResponse.json({
        success: false,
        message: `Оишкба удаления новости ${error.message}`,
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