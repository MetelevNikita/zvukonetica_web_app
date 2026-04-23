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


// image

import img from '@/../public/app/about/img.png'





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
            <Image style={{borderRadius: '10px'}} width={1920} height={109} src={bannerUrl as string} alt={'banner'} />
        </Col>
      </Row>

      {/*  */}


      <Row className='mb-5'>
        <Col>

          <div className={styles.about_title}>о методике</div>
        
        </Col>
      </Row>


      <Row className='mb-5'>
        <Col>

          <p className={styles.about_description} style={{ whiteSpace: 'pre-line' }}>{`Звуконетика - это метод управления состоянием живых систем через звук голоса человека и звучание группы, направленных на приведение в желаемое психоэмоциональное состояние человека, физическое, ментальное и энергетическое состояние групп людей, а также на изменение характеристик состояния ситуации и обстоятельств, таких как динамика, напряженность и атмосфера.\n\nВ основе подхода лежит идея, что голос — это не только средство речи, но и инструмент влияния, через которое проявляется внутреннее состояние человека, его уверенность, сила мысли, способность удерживать внимание и формировать пространство взаимодействия.\n\nЗвуконетические практики  создают поле синергетического звучания пространства.\n\nВ нем рождается энергия объединенных эмоциональных состояний участников. Звучание состояний - язык взаимодействия с полем. Настрой на прямое видение в поле звучания согласованного намерения каждого открывает путь к его воплощению. Звук охватывает звучащих целиком; полностью объединяя без слов эмоцию и намерение; открывая путь к его воплощению. Синергия звучания объединенного воплощенного намерения обеспечивает достижение личных и общих целей в различных жизненных и деловых обстоятельствах.`}</p>
        
        </Col>
      </Row>


      <Row>
        <Col>

            <Image width={1920} height={423} src={img} alt={'image'} />

        </Col>
      </Row>


      <Row className='mb-5'>
        <Col>

          <p className={styles.about_description} style={{ whiteSpace: 'pre-line' }}>{`Звуконетика учит говорить особым образом. Она помогает человеку настроить себя как инструмент, через который проявляется звуковое присутствие голоса своего Я.\n\nМетод применяется руководителями, предпринимателями и управленческими командами и направлена на развитие зрелых, точных и тонких способов влияния — без давления, конфликтов и выгорания. Воодушевляющих, резонансных, эффективных. `}</p>
        
        </Col>
      </Row>


    </Container>
  )
}

export default page