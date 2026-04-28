'use client'

import { FC, Suspense, useEffect, useState } from 'react'
import Image from 'next/image'

// styles

import styles from './Participants.module.css'

// react-bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// img

import img from '@/../public/app/Participants/participants_img.png'

// 

import { getReels } from '@/lib/getReels'

// components

import SwiperVideo from '@/module/swiperVideo/swiperVideo'

const Participants: FC = () => {


  const [video, setVideo] = useState<any | null>(null)


  // useEffect(() => {

  //   async function getResultVideo () {
  //     const video = await getReels()
  //     setVideo(video.data)
  //   }

  //   getResultVideo()

  // }, [])



  if (!video) return (
    <div>Loading</div>
  )


  return (

    <Container className='mt-5'>
      <Row>
        <Col md={6} xs={12} className='mt-2 mb-2'>
          <Image src={img} alt='participants' className={styles.img} />
        </Col>

        <Col md={6} xs={12} className='mt-2 mb-2'>
          <div className={styles.participants_text}>Участники учатся осознанно работать со своим голосом, освобождая автоматические привычки, зажимы, привычные модели коммуникации. Освоив звуконетику, руководители могут интегрировать её в повседневную деятельность, встречи, переговоры, командные сессии. <br /><br /> Тем, кто имеет психологические особенности, рекомендуется предварительная консультация для подбора комфортного ритма работы.</div>
        </Col>
        
      </Row>

    {/* 
      <Row>
        <Suspense fallback="loading...">
            <SwiperVideo video={video.data}/>
        </Suspense>
      </Row> */}
    </Container>
  

  )
}

export default Participants
