export async function getReels (): Promise<{success: boolean, message: string, data: any}> {
  try {

    const responce = await fetch('/api/reels', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })

    if (!responce.ok) {
      return {
        success: false,
        message: 'Не удалось сделать запрос на сервер для получения видео',
        data: null
      }
    }


    const data = await responce.json()

    return {
        success: false,
        message: 'Не удалось сделать запрос на сервер для получения видео',
        data: data
    }
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching reels from ya:', error.message)
      return {
        success: false,
        message: 'Не удалось сделать запрос на сервер для получения видео',
        data: null
      }
    }

    console.error('unknow error:', error)
    return {
      success: false,
      message: 'Не удалось сделать запрос на сервер для получения видео',
      data: null
    }
  }
}