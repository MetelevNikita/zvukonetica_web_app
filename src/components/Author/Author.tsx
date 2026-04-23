'use client'

import { FC } from 'react'
import { motion } from "motion/react"
import Image from 'next/image'

// style

import styles from './Author.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/ui/MyButton/MyButton'
import MainTitle from '@/ui/mainTitle/mainTitle'

// img

import photo from '@/../public/app/author/photo_author.png'

// json

import diplomJson from '@/json/diplom.json' with { type: 'json' }



const Author: FC = () => {
  return (

    <Container>
      <MainTitle title={'автор методики'}/>
      <Row>

        <Col md={6} className='d-flex justify-content-start'>
            <div className={styles.author_title_wrapper}>
              <div className={styles.author_title}>
                Эксперт в области креативных технологий управления, развития человеческого потенциала и инновационных образовательных методов.

                Автор более 30 научных и учебно-методических пособий, посвящённых вопросам самоорганизации, самоуправления, соучастия, вовлеченности и развитию управленческих компетенций.

                Награждена грамотами и благодарственными письмами муниципального, регионального и федерального уровня за вклад в развитие организаций и территорий.

                Получила положительные отзывы и рекомендации от руководителей государственных и муниципальных органов власти, а также представителей бизнеса, что подтверждает высокий уровень профессионального мастерства и деловой репутации.
              </div>
            </div>
        </Col>


        <Col md={6} className='d-flex justify-content-end'>
            <div className={styles.author_photo_bg}>
              <Image className={styles.author_photo} width={472} height={454} src={photo} alt={'photo'} />
            </div>
        </Col>
        
      </Row>


      {/* diplom */}

      <Row className='mt-3 mb-5'>

        
          {
            (diplomJson.length > 0) && diplomJson.map((item, index) => {
              return (
                <Col md={2} key={item.id} className={`d-flex justify-content-center`}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >

                      <div className={styles.diplom_wrapper}>
                        <img className={styles.diplom_image} src={item.image} alt="diploms" />
                        {/* <Image  width={1500} height={500} src={item.image} alt={'diploms'}/> */}
                      </div>
                   
                  </motion.div>
                </Col>
              )
            })
          }

      </Row>



      {/* diplom */}


  
      <Row>
        <Col className='d-flex justify-content-center'>

          <MyButton text={'Показать больше'} onClick={() => {}} />
        
        </Col>
      </Row>
    </Container>
    

  )
}

export default Author
