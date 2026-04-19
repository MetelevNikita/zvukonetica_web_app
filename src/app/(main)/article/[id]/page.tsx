


// styles

import { newsType } from '@/types/types'
import styles from './page.module.css'


// components

import OpenArticle from '@/components/OpenArticle/OpenArticle'

// 

async function getCurrentArticle() {

  try {

    const responce = await fetch(`http://localhost:3000/api/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!responce.ok) {
      console.error(`Ошибка получения статьи: ${responce.statusText}`)
      return null
    }

    const data = await responce.json()
    return data
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка получения статьи: ${error.message}`)
    } else {
      console.error(`Неизвестная ошибка получения статьи: ${error}`)
    }
    
  }

}


const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params




  const articles = await getCurrentArticle() as any

  const currentArticle = articles?.data.find((article: newsType) => article.id === parseInt(id))

  if (!currentArticle) {
    return (
      <div className={styles.not_found}>
        Статья не найдена
      </div>
    )
  }

  return (
    <OpenArticle article={currentArticle} />
  )
}

export default page