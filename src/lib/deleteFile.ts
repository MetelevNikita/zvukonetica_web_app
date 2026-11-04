import path from 'path'
import fs from 'fs'
import os from 'os'

export async function deleteFile (pathToFile: string): Promise<{success: boolean, message: string, data: any} | any> {
  try {

    const arch = os.arch()

    const pathParse = path.parse(pathToFile)
 
    const pathToFolder = pathParse.dir.split('/').filter((item) => item.length > 1).splice(1).join((arch === 'x64') ? '\\' : '/')
    const filename = pathParse.base



    const pathFromDelete = path.resolve(process.cwd(), 'src', 'app', pathToFolder)


    if (!fs.existsSync(pathFromDelete)) {
      return {
        success: false,
        message: 'Не найден файл для удаления',
        data: null
      }
    }

    fs.rmSync(pathFromDelete, {recursive: true, force: true})

    return {
      success: true,
      message: "Файл удален",
      data: pathToFile
    }
    
  } catch (error: Error | unknown) {
    return {
      success: false,
      message: "Не удалось удалить изображение из исходной папки",
      data: null
    }
  }
}