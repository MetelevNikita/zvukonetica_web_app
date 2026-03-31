import { FC } from 'react'
import Image from 'next/image'

// styles

import styles from './Participants.module.css'

// react-bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// img

import img from '@/../public/app/Participants/participants_img.png'

// json!!!!

import reelsJson from '@/json/reels.json' assert { type: 'json' }


// 

const Participants: FC = () => {
  return (

    <Container className='mt-5'>
      <Row>
        <Col md={6}>
          <Image src={img} alt='participants' className={styles.img} />
        </Col>

        <Col md={6}>
          <div className={styles.participants_text}>Участники учатся осознанно работать со своим голосом, освобождая автоматические привычки, зажимы, привычные модели коммуникации. Освоив звуконетику, руководители могут интегрировать её в повседневную деятельность, встречи, переговоры, командные сессии. <br /><br /> Тем, кто имеет психологические особенности, рекомендуется предварительная консультация для подбора комфортного ритма работы.</div>
        </Col>
        
      </Row>


      <Row>

        

      </Row>
    </Container>
  

  )
}

export default Participants
