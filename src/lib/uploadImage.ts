import fs from 'fs'
import path from 'path'


export async function uploadImage (data: string, filename: string) {
  try {

    const uniqId = `article_${Date.now()}`

    if (!data || typeof data !== 'string' || !filename) {
      return {
        success: false,
        message: `Буффер не может быть пустым`,
        data: null
      }
    }

    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)



    if (!matches || matches.length !== 3) {
      throw new Error('Неверный формат Base64')
    }

    const mimeType = matches[1]

    const ext = mimeType.split('/')[1]

    if (!['jpeg', 'jpg', 'png', 'gif'].includes(ext)) {
      throw new Error('Недопустимый тип файла. Разрешены только JPEG, PNG и GIF.')
    }

    const base64Data = matches[2]

    console.log(`Получен файл с MIME-типом: ${mimeType}`)


    const uploadFolder = path.resolve(process.cwd(), 'src', 'app', 'uploads')

    if (!fs.existsSync(uploadFolder)) {
      console.info('Папки uploads не существует, создаем')
      fs.mkdirSync(uploadFolder, {recursive: true})
    }


    const articleFolder = path.resolve(uploadFolder, 'article')

    if (!fs.existsSync(articleFolder)) {
      console.info('Папки articles не существует, создаем')
      fs.mkdirSync(articleFolder, {recursive: true})
    }


    // создаем уникальную папку с фото новости

    const endFolder = path.resolve(articleFolder, uniqId)
    fs.mkdirSync(endFolder, {recursive: true})
    console.info(`Папка ${uniqId} создана`)

    //

    const filePath = path.resolve(endFolder, `${filename}.${ext}`)
    const bufferImage = Buffer.from(base64Data, 'base64')

    const url = `/uploads/article/${uniqId}/${filename}.${ext}`

    await fs.promises.writeFile(filePath, bufferImage)

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