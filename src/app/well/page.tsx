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

// components

import Steps from '@/ui/Steps/Steps'
import StepsProgram from '@/ui/StepsProgram/StepsProgram'
import RecieiveBlock from '@/module/recieiveBlock/recieiveBlock'

// ui

import MyButton from '@/ui/MyButton/MyButton'


// json

import stepsJson from '@/json/steps.json' with { type: 'json' }
import stepsProgram from '@/json/stepsProgram.json' with {type: 'json'}
import receiveJson from '@/json/receive.json' with { type: 'json' }








const page: FC = () => {


  const router = useRouter()

  // 
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

      <Row className='mb-2'>
        <Col md={12} className='d-flex justify-content-center mb-5'>

          <Image width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

        </Col>
      </Row>

      {/*  */}


      <Row className='mb-3'>
        <Col>

          <div className={styles.well_title}>В программе курса</div>
        
        </Col>
      </Row>


      <Row className='mb-5'>
        <Col>

          <p className={styles.well_description} style={{ whiteSpace: 'pre-line' }}>{`Курс Звуконетика - это программа формирования тонких навыков управления собой, людьми и обстоятельствами, основанная на использовании динамического звучания голоса человека и группы для достижения целей в условиях неопределенности.\n\nПрограмма предназначена для руководителей, предпринимателей, специалистов, работающих с людьми и организациями, которым требуется развитие креативного мышления и навыки нестандартных действий в сложных ситуациях, позволяющих находить идеи и подходы, которые находятся «за словами» и очевидными решениями.\n\nЗвуконетика  помогает настроить поле звучания голоса, способного влиять на изменение реальности, сформировать звуковой личный бренд, получить конкурентное преимущество видения скрытых процессов, позволяющих нейтрализовать риски и выйти на новый уровень.`}</p>
        
        </Col>
      </Row>


      <Row className='mb-3'>
        <Col className='d-flex justify-content-center'>

          <p className={styles.well_steps_text} style={{ whiteSpace: 'pre-line' }}>{`Курс состоит из пяти ступеней (модулей), каждая из которых формирует новое качество внутреннего и внешнего звучания голоса, определяющего силу и величину поля личного влияния:`}</p>
        
        </Col>
      </Row>

      {/* well steps item  */}

      <Row className='mb-5 d-flex justify-content-center mb-3'>
        {stepsJson.map((item: {id: number, title: string}, index: number): React.ReactNode => {
          return <Col key={item.id} md={4} className='mb-3'>
                    <motion.div
           
                      animate={{opacity: 0, scale: 0.8}}
                      whileInView={{opacity: 1, scale: 1}}
                      transition={{duration: 1, delay: index * 0.2}}
                    >
                      <Steps num={item.id} title={item.title} />
                    </motion.div>
                  </Col>
        })}
      </Row>

      {/*  */}

      <Row className='d-flex flex-column mb-3'>

        <Col>
          <p className={styles.well_description_title}>Звуконетика  - это не занятия вокалом или ораторским искусством.</p>
        </Col>

        <Col>
          <p className={styles.well_description} style={{ whiteSpace: 'pre-line' }}>{`Это системная работа с внутренними настройками человека, как особого звукового инструмента, влияющего на состояние своей и окружающей реальности. В ходе программы участники осваивают практики, которые помогают установить связь между звуком, эмоциями, поведением и качеством возникающих жизненных ситуаций.`}</p>
        </Col>

      </Row>

      {/* program curs */}


      <Row className='mb-3'>
        <Col>

          <div className={styles.well_title}>В программе курса</div>
        
        </Col>
      </Row>

      <Row className='mb-3'>

        {
          stepsProgram.map((item: {title: string, subtitle: string, list: string[]}, index: number): React.ReactNode => {
            return (
              <Col md={6} className='d-flex justify-content-center mt-3 mb-3' key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <StepsProgram title={item.title} subtitle={item.subtitle} list={item.list} />
                </motion.div>
              </Col>
            )
          })
        }

        <Col md={6} className='d-flex justify-content-center mt-3 mb-3'>

          <motion.div
            className={styles.well_steps_program_container}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 4 * 0.2 }}
            
            >
            <div className={styles.well_steps_program_item_wrapper}>

              <div className={styles.well_steps_program_item_title}>Подробности программы курсов</div>

              <div className={styles.well_steps_program_button_container}>

                <MyButton onClick={() => router.push('/well/steps')} text={'Подробнее о ступенях'} />

              </div>
   
              
            </div>
          </motion.div>
        
        </Col>

      </Row>


      <Row className='mb-3'>
        <Col>

          <div className={styles.well_title}>ЧТО ВЫ ПОЛУЧАЕТЕ</div>
        
        </Col>
      </Row>


      <Row className='d-flex justify-content-center'>


        {
          (receiveJson.length > 1) && receiveJson.map((item: {id: number, title: string, subtitle: string}): React.ReactNode => {
            return <Col key={item.id} className='d-flex justify-content-center mt-4'><RecieiveBlock num={item.id} title={item.title} subtitle={item.subtitle} /></Col>
          })
        }


      </Row>









    </Container>
  )
}

export default page