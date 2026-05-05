import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from "path";

// 

import { prisma } from '@/lib/prisma'

// transport nodemailer

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_LOGIN as string,
    pass: process.env.GMAIL_PASSWORD as string
  }
})

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


    await prisma.comment.create({
      data: body
    })

    // mail

    const readyToMail = await transporter.verify();
    console.log(`Server is ready to take our messages - ${readyToMail}`);


    await transporter.sendMail({
      from: body.email,
      to: "propaganda1108@gmail.com",
      subject: "Сообщение с сайта zvukonetika.ru",
      text: body.message,
      html: `<h3>Сообщение от ${body.email}</h3><br/><p>${body.message}</p>`
    })


    // 


    return NextResponse.json({
        success: true,
        message: `Комментарий создан`,
        data: body
    })


  } catch (error: Error | unknown) {
    
    if (error instanceof Error) {

      console.error(`Оишкба отправки коментария ${error.message}`)

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