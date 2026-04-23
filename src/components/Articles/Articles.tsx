'use client'

import { FC, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MainTitle from '@/ui/mainTitle/mainTitle'
import NewsBlock from '@/module/newsBlock/newsBlock'
import MyButton from '@/ui/MyButton/MyButton'

// type

import { newsType } from '@/types/types'

// fn

import { getNews } from '@/lib/getNews'


const Articles: FC = () => {


  const [articles, setArticles] = useState<newsType[] | []>([])
  const router = useRouter()

  // 


   useEffect(() => {
      async function getAllNews () {
        const articles = await getNews()
  
        if (!articles.success) return []
        setArticles(articles.data)
      }
  
  
      getAllNews()
    }, [])

  return (

    <Container>
      <MainTitle title={'статьи'}/>

      <Row>
        {articles.map((article, index) => (
          <Col key={index} md={4} className='mb-4'>
              
            <motion.div
              whileHover={{scale: 0.95}}
              whileTap={{scale: 1.05}}
              onClick={() => {
                router.push(`/article/${article.id}`)
              }}>
                <NewsBlock
                    title={article.title}
                    description={article.description}
                    image={article.image}
                />
            </motion.div>

          </Col>
        ))}
      </Row>


      <Row className='mt-4 mb-4'>
        <Col className='d-flex justify-content-center'>

          <MyButton text={'Показать все'} onClick={() => {
            router.push('/articles/all')
          }} />
        
        </Col>
      </Row>
    </Container>

  )
}

export default Articles
