'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// style

import styles from './Main.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/ui/MyButton/MyButton'

// image

import boderImage from '@/../public/app/main_block/border.png'
import image from '@/../public/app/main_block/image.png'
import titleLogo from '@/../public/app/main_block/title_logo.svg'

// icons

import clock from '@/../public/app/icon/Clock.png'
import geo from '@/../public/app/icon/Location Pin.png'


// types

import type { infoType } from '@/types/types'
import { div } from 'motion/react-client'

const Main: FC = () => {



  const info: infoType[] = [
    {
      id: 1,
      title: 'СТАРТ КУРСА 22-24 мая 2026 г.',
      icon: clock
    },

    {
      id: 2,
      title: 'Город Москва',
      icon: geo
    },
  ]


  return (

    <Container>
      <Row className='d-flex flex-row justify-content-center align-items-center wv-100 mt-4 mb-4'>

        <Col className={'d-flex flex-column justify-content-between'} style={{height: 528}} md={6}>

        <div className={styles.main_logo_wrapper}>
          <div className={styles.main_logo_text}>автор метода Н.М. Филиппова©</div>
          <Image width={611} height={147} src={titleLogo} alt={'main_logo'}/>
        </div>

        <div className={styles.main_description_wrapper}>
          <div className={styles.main_description_text}>«Ваш голос оставляет отпечаток. Вопрос только — какой именно вы хотите оставить?»</div>
        </div>

        <MyButton text={'Хочу присоединиться'} onClick={() => {}} />

        <div className={styles.main_info_container}>
          {
            (info.length > 0) && info.map((item: infoType): React.ReactNode => {
              return (
                    <div key={item.id} className={styles.main_info_wrapper}>
                      <Image width={24} height={24} src={item.icon} alt={'icon'}/>
                      <div className={styles.main_info_text}>{item.title}</div>
                    </div>
                  )
            })
          }
        </div>
        
        
        
        </Col>



        <Col className={'d-flex justify-content-center'}  md={6}>
        
            <Image width={402} height={488} src={image} alt={'image'}/>
          
        </Col>


      </Row>
    </Container>

  )
}

export default Main
