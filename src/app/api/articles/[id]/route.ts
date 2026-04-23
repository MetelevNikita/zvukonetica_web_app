// @ts-ignore


import { NextResponse, NextRequest } from "next/server"
import path from 'path'
import fs from 'fs'

// lib

import { deleteFile } from "@/lib/deleteFile"

// 

import { prisma } from '@/lib/prisma'

export const DELETE = async (req: NextRequest, context: {params: {id: string}}) => {
  try {

    const {id} = context.params
    console.log(id)

    const findArticle = await prisma.articles.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!findArticle) {
      return NextResponse.json({
        success: false,
        message: 'Не найдена новость для удаления'
      })
    }


    const deleteFileHandler = await deleteFile(findArticle.image)
    console.log(deleteFileHandler)

    await prisma.articles.delete({
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