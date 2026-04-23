'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

// styles

import styles from './page.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import { getBanner } from '@/lib/getBanner'
import { getNews } from '@/lib/getNews'

// types

import { newsType } from '@/types/types'

// components

import NewsBlock from '@/module/newsBlock/newsBlock'


const page: FC = () => {


  const router = useRouter()

  // 

  const [articles, setArticles] = useState<newsType[] | []>([])
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)

  useEffect(() => {
    async function getBannerUrl () {
      const url = await getBanner()
      console.log(url)

      if (!url) return 'Баннер не найден'

      setBannerUrl(url)
    }

    getBannerUrl()
  }, [])

  useEffect(() => {
    async function getAllNews () {
      const articles = await getNews()

      if (!articles.success) return []
      setArticles(articles.data)
    }


    getAllNews()
  }, [])



  if (!bannerUrl) {
    return (

      <Container>
          <Row>
            <Col md={12} className='d-flex justify-content-center mb-5'>
                <h3 style={{color: 'white', height: '100vh'}}>LOADING...</h3>
            </Col>
          </Row>
      </Container>
    )
    
  }


  return (
    
    <Container>

      <Row className='mb-5'>
        <Col md={12} className='d-flex justify-content-center mb-5'>

          <Image style={{borderRadius: '10px'}} width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

        </Col>
      </Row>

      {/*  */}


      <Row className='mb-5'>
        <Col>

          <div className={styles.article_title}>Статьи</div>
        
        </Col>
      </Row>


      <Row>

          {
            (articles.length !== 0) && articles.map((article: newsType, index: number): React.ReactNode => {
    
              return (
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
              )
            })
          }

      </Row>
    </Container>
  )
}

export default page