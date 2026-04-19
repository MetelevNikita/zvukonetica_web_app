import fs from 'fs'
import path from 'path'


export async function uploadImage (data: string, filename: string) {
  try {

    const uniqId = `article_${Date.now()}`

    if (!data) {
      return {
        success: false,
        message: `Буффер не может быть пустым`,
        data: null
      }
    }


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

    const filePath = path.resolve(endFolder, filename)
    const bufferImage = Buffer.from(data)

    await fs.promises.writeFile(filePath, bufferImage)

    return {
        success: true,
        message: `ФОТО УСПЕШНО СОХРАНЕНО`,
        data: filePath
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