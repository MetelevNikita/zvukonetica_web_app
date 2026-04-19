export async function getNews (): Promise<any | Error> {
  try {

    const responce = await fetch('/api/articles', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })

    if (!responce.ok) {
      throw new Error(`Оишбка сетевого запроса на сервер ${responce.status} - ${responce.statusText}`)
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching news:', error.message)
      return `Error fetching news: ${error.message}`
    }

    console.error('unknow error:', error)
    return `unknow error: ${error}`
  }
}