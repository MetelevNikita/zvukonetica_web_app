import path from 'path'
import fs from 'fs'
import os from 'os'

export async function deleteFile (pathToFile: string): Promise<{success: boolean, message: string, data: any} | any> {
  try {

    const arch = os.arch()
    console.log(arch)

    const pathParse = path.parse(pathToFile)
 
    const pathToFolder = pathParse.dir.split('/').filter((item) => item.length > 1).splice(1).join((arch === 'x64') ? '\\' : '/')
    const filename = pathParse.base



    const pathFromDelete = path.resolve(process.cwd(), 'src', 'app', pathToFolder)

    console.log(pathFromDelete)

    if (!fs.existsSync(pathFromDelete)) {
      return {
        success: false,
        message: 'Не найден файл для удаления',
        data: null
      }
    }

    fs.rmSync(pathFromDelete, {recursive: true, force: true})
    console.log('Файл удален')

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