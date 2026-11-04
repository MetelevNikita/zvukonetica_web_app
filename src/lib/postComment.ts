export async function postComment (comment: {name: string, email: string, message: string, politic: boolean}): Promise<any> {
  try {


    const responce = await fetch('/api/comment', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(comment)
    })

    if (!responce.ok) {
      throw new Error('Error fetching post comment')
    }

    const data = await responce.json()
    return data
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching post comment:', error.message)
      return `Error fetching post comment: ${error.message}`
    }

    console.error('unknow error:', error)
    return `unknow error: ${error}`
  }
}