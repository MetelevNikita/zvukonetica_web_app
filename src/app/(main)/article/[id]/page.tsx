

// styles

import styles from './page.module.css'


// JSON

import news from '@/json/news.json' with {type: 'json'}

// components

import OpenArticle from '@/components/OpenArticle/OpenArticle'

// 



const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params


  function getCurrentArticle() {
    const article = news.find((item) => item.id == parseInt(id))
    return article
  }


  let currentArticle = getCurrentArticle()


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