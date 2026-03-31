'use client'

import { FC } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MainTitle from '@/ui/mainTitle/mainTitle'
import NewsBlock from '@/module/newsBlock/newsBlock'


// json!!!

import articlesData from '@/json/news.json' assert { type: 'json' }
import MyButton from '@/ui/MyButton/MyButton'


const Articles: FC = () => {


  const router = useRouter()

  return (

    <Container>
      <MainTitle title={'статьи'}/>

      <Row>
        {articlesData.map((article, index) => (
          <Col key={index} md={4} className='mb-4'>
              
            <motion.div
              whileHover={{scale: 0.95}}
              whileTap={{scale: 1.05}}
              onClick={() => {
                router.push(`/articles/${article.id}`)
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
