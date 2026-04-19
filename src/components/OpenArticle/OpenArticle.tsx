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

import { getBanner } from '@/lib/getBanner'





interface OpenArticleProps {
  article: any
}

const OpenArticle: FC<OpenArticleProps> = ({ article }) => {


  const [bannerUrl, setBannerUrl] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchBanner = async () => {
      const url = await getBanner()
      console.log(url)
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

          <Image width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

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