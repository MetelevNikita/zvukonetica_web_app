import { ins } from "motion/react-client"

export async function getBanner () {
  try {

    const response = await fetch('/api/banner', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch news banner')
    }

    const data = await response.json()
    console.log(data)
    return data.data[0].image
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching banner:', error.message)
      return `Error fetching banner: ${error.message}`
    }

    console.error('unknow error:', error)
    return `unknow error: ${error}`
  }
}