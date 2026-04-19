import fs from 'fs'
import path from 'path'

// 

import sharp from 'sharp'


export async function uploadImage (data: File | any, filename: string, category: string, size: number) {
  try {

        if (!data) return
        const ext = data?.type.split('/')[1]


        if (!['jpeg', 'jpg', 'png', 'gif'].includes(ext)) {
          throw new Error('Недопустимый тип файла. Разрешены только JPEG, PNG и GIF.')
        }

        const uniqId = `${category}_${Date.now()}`

        if (!data || !filename || !category) {
          return {
            success: false,
            message: `Буффер не может быть пустым`,
            data: null
          }
        }

        const arrayBuffer = await data.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)


        const newFile = await sharp(buffer)
          .resize(size)
          .jpeg({ mozjpeg: true, quality: 90})
          .toBuffer()

        // 

        const uploadFolder = path.resolve(process.cwd(), 'src', 'app', 'uploads')

        if (!fs.existsSync(uploadFolder)) {
          console.info('Папки uploads не существует, создаем')
          fs.mkdirSync(uploadFolder, {recursive: true})
        }


        const Folder = path.resolve(uploadFolder, category)

        if (!fs.existsSync(Folder)) {
          console.info('Папки articles не существует, создаем')
          fs.mkdirSync(Folder, {recursive: true})
        }


        // создаем уникальную папку с фото новости

        const endFolder = path.resolve(Folder, uniqId)
        fs.mkdirSync(endFolder, {recursive: true})
        console.info(`Папка ${uniqId} создана`)

        //

        const filePath = path.resolve(endFolder, `${filename}.${ext}`)


        const url = `/api/uploads/${category}/${uniqId}/${filename}.${ext}`

        await fs.promises.writeFile(filePath, newFile)

        return {
            success: true,
            message: `ФОТО УСПЕШНО СОХРАНЕНО`,
            data: url
        }

    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка загрузки фото ${error.message}`)
      return {
        success: false,
        message: `Ошибка загрузки фото ${error.message}`,
        data: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }

    
  }
}