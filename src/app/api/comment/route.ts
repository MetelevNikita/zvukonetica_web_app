import { NextResponse, NextRequest } from "next/server";
import fs from 'fs'
import path from "path";




//


const pathToFile = path.join(process.cwd(), 'src', 'json', 'comments.json')

export const GET = async () => {
  try {

    const comments = fs.readFileSync(pathToFile, {encoding: 'utf-8'})

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
    
    const data = await req.json()
    if (!data) return


    // 

    const comments = fs.readFileSync(pathToFile, {encoding: 'utf-8'})

    const array = JSON.parse(comments)
    console.log(array)


    const updatedComments = [...array, data]

    console.log('updates ', updatedComments)


    // send


    fs.writeFileSync(pathToFile, JSON.stringify(updatedComments, null, 2))


    return NextResponse.json({
        success: true,
        message: `Комментарий создан`,
        data: data
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