import { ins } from "motion/react-client"

export async function getBanner () {
  try {

    const response = await fetch('/api/uploads/banner/banner.png', {
      method: 'GET',
      headers: {
        'Content-Type': 'image/png'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch news banner')
    }

    const blob = await response.blob()
    const imageUrl = URL.createObjectURL(blob)
    console.log(imageUrl)
    return imageUrl
    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching banner:', error.message)
      return `Error fetching banner: ${error.message}`
    }

    console.error('unknow error:', error)
    return `unknow error: ${error}`
  }
}