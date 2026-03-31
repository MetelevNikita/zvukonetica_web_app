'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"

// style

import styles from './Footer.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// image

import vk from '@/../public/app/social_logo/vk.png'
import tg from '@/../public/app/social_logo/tg.png'
import yt from '@/../public/app/social_logo/yt.png'

// logo

import logo from '@/../public/app/logo/logo.svg'

// components

import MyButton from '@/ui/MyButton/MyButton'

// types

import { socialType } from '@/types/types'

// 

const Footer: FC = () => {

  const router = useRouter()


  const social: socialType[] = [
    {
      id: 1,
      label: 'В контакте',
      value: 'vk',
      link: '',
      image: vk
    },
    {
      id: 2,
      label: 'Телеграм',
      value: 'tg',
      link: '',
      image: tg
    },
    {
      id: 3,
      label: 'Ютуб',
      value: 'yt',
      link: '',
      image: yt
    },

    {
      id: 4,
      label: 'WhatsApp',
      value: 'wa',
      link: '',
      image: yt
    },
  ]



  return (
    <div style={{width: '100%', height: '164px', background: '#280101'}} className={'mt-3'} >

      <Container>
        <Row className='d-flex flex-row justify-content-center align-items-center wv-100'>

          <Col md={8} className='d-flex justify-content-start mt-4'>
            <motion.div
              initial={{x: 0}} animate={{x: -10}} transition={{duration: 3}}
              className={styles.logo_container}>
                  <Image
                    width={299}
                    height={50}
                    src={logo}
                    alt={'logo'}
                  />
            </motion.div>
          </Col>

          <Col md={2} className='d-flex justify-content-around mt-4'>

          {(social.length > 0) && social.map((logo: socialType): React.ReactNode => {
            return <motion.div
                      key={logo.id}
                      onClick={() => {
                        router.push(logo.link)
                      }}
                      whileHover={{scale: 1.1}}
                      >
                          <Image
                            width={39}
                            height={39}
                            src={logo.image}
                            alt={'social_logo'}
                          />
                    </motion.div>
          })}

          </Col>

          <Col md={2} className='d-flex justify-content-md-end justify-content-center mt-4'>
              <MyButton
                text={'Написать'}
                onClick={() => {
                  router.push('/')
                }}
              />
          </Col>

        </Row>

        <Row className='d-flex flex-row justify-content-center align-items-center wv-100 mt-4'>
          <Col className='d-flex flex-row justify-content-center'>
              <motion.div className={styles.footer_line}></motion.div>
          </Col>
        </Row>

        <Row className='d-flex flex-row justify-content-center align-items-center wv-100 mt-4'>
          <Col className='d-flex flex-row justify-content-center'>
                <div className={styles.footer_text}>Согласие на обработку персональных данных</div>
          </Col>
        </Row>



      </Container>
      
    </div>
  )
}

export default Footer
