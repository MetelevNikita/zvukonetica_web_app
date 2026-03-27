'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// style

import styles from './Question.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/ui/MyButton/MyButton'

// image

import img from '@/../public/app/question_block/img_question.png'

const Question: FC = () => {

  const router = useRouter()

  return (

    <Container>
      <Row className='d-flex flex-row justify-content-center align-items-center wv-100 mt-4 mb-4'>

        <Col className={'d-flex flex-column justify-content-between'} style={{height: 333}} md={6}>

          <div className={styles.question_title}>Eсли остались вопросы</div>
          <div className={styles.question_subtitle}>Мы с радостью ответим на ваши вопросы и отправим программу мероприятия вам на почту.</div>

          <MyButton text={'Написать'} onClick={() => {}} />
        
        </Col>

        <Col className={'d-flex'} md={6}>
          <Image width={613} height={133} src={img} alt=''/>
        </Col>


      </Row>
    </Container>

  )
}

export default Question
