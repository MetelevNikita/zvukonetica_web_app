'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// styles

import styles from './OpenArticle.module.css'

// bootsrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/ui/MyButton/MyButton'

//

export async function getNewsBanner () {
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
    return imageUrl
    
  } catch (error) {
    console.error('Error fetching news banner:', error)
  }
}



interface OpenArticleProps {
  article: any
}

const OpenArticle: FC<OpenArticleProps> = ({ article }) => {

  const [bannerUrl, setBannerUrl] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchBanner = async () => {
      const url = await getNewsBanner()
      if (url) {
        setBannerUrl(url)
      }
    }
    fetchBanner()
  }, [])


  if (!article) {
    return (
      <Container className={styles.container}>
        <Row>
          <Col md={12}>
            <div>Статья не найдена</div>
          </Col>
        </Row>
      </Container>
    )
  }





  return (
    <Container className={styles.container}>
      <Row className='mt-3 mb-5'>
        <Col md={12} className='d-flex justify-content-center'>

        <Image className={styles.article_banner as string ?? ''} width={0} height={0} src={bannerUrl} alt="News Banner" />

        </Col>
      </Row>



      <Row className='mt-3 mb-3'>
        <Col md={12}>
          <div className={styles.article_title}>{article.title}</div>
        </Col>
      </Row>

      <Row className='mt-3 mb-5'>
        <Col>
        <p style={{ whiteSpace: "pre-line" }} className={styles.article_description}>{article.description}</p>
        </Col>
      </Row>


      <Row className='mt-3 mb-5'>
        <Col>
          <MyButton text={'Назад'} onClick={() => {
            router.back()
          }} />
        </Col>
      </Row>

    </Container>
  )
}

export default OpenArticle