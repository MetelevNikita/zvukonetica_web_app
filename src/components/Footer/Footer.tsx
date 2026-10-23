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
      link: 'https://vk.ru/club235259626',
      image: vk
    },
    {
      id: 2,
      label: 'Телеграм',
      value: 'tg',
      link: 'https://max.ru/join/JBTIpN9A35jkobkUNUH-iM2MZV5Qq_vygEsNJV_-zlY',
      image: tg
    }
  ]



  return (
    <div style={{width: '100%', height: '100%', background: '#280101'}} className={'mt-3'} >

      <Container>
        <Row className='align-items-start gy-4'>

          <Col md={7} lg={8} className='d-flex flex-column mt-4'>
            <motion.div
              className={styles.logo_container}>
                  <Image
                    width={299}
                    height={50}
                    src={logo}
                    alt={'logo'}
                  />
            </motion.div>



            <div className={styles.info_pay}>
              Филиппова Нина Мироновна<br/>
              ИНН 027720805974<br/>
              ОГРН 317028000132275<br/>
              ifilippovanina@gmail.com<br/>
            </div>
          </Col>


          <Col md={5} lg={4} className='mt-4'>
            <div className={styles.actions}>
              <div className={styles.social_logo_container}>
                {social.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.link}
                    aria-label={item.label}
                    whileHover={{scale: 1.1}}
                  >
                    <Image
                      width={39}
                      height={39}
                      src={item.image}
                      alt={item.label}
                    />
                  </motion.a>
                ))}
              </div>
              <MyButton
                text={'Написать'}
                onClick={() => router.push('/contacts')}
              />
            </div>

            <div className={styles.legal_links}>
              <div>Политика конфиденциальности</div>
              <div>Договор оферты</div>
              <div>Пользовательское соглашение</div>
            </div>
          </Col>

        </Row>

        <Row className='d-flex flex-row justify-content-center align-items-center wv-100 mt-4 mb-3'>
          <Col className='d-flex flex-row justify-content-center'>
              <motion.div className={styles.footer_line}></motion.div>
          </Col>
        </Row>


      </Container>
      
    </div>
  )
}

export default Footer
