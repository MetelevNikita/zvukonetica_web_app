'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"

// style

import styles from './Header.module.css'

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

import { menuType, socialType } from '@/types/types'

// 



const Header: FC = () => {

  const router = useRouter()


  const menu: menuType[] = [
    {
      id: 1,
      label: 'Автор',
      value: 'author',
      link: '/author'
    },
    {
      id: 2,
      label: 'О методике',
      value: 'about',
      link: '/about'
    },
    {
      id: 3,
      label: 'О курсе',
      value: 'well',
      link: '/well'
    },
    {
      id: 4,
      label: 'Программа',
      value: 'program',
      link: '/program'
    },
    {
      id: 5,
      label: 'Фотогалеря',
      value: 'photo',
      link: '/gallery'
    },
    {
      id: 6,
      label: 'Статьи',
      value: 'links',
      link: '/article'
    },
    {
      id: 7,
      label: 'Контакты',
      value: 'program',
      link: '/contacts'
    },
    
  ]

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
  ]



  return (

    <Container>

      <div className={styles.header_container}>
        <Row className='d-flex flex-row justify-content-center align-items-center wv-100'>

          <Col md={8} className='d-flex justify-content-start mt-4'>
            <motion.div
              initial={{opacity: 0, x: 0}} animate={{opacity: 1, x: -10}} transition={{duration: 3}}
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


        <Row className='d-flex justify-content-center mt-4'>
            <motion.div
              initial={{scaleX: 0.6}}
              animate={{scaleX: 1}}
              transition={{duration: 3}}
              className={styles.menu_line}>
            </motion.div>
        </Row>

        <Row className='d-flex justify-content-center mt-3'>

          {
            (menu.length > 0) && menu.map((item: menuType): React.ReactNode => {
              return <Col key={item.id}>
                        <motion.div
                        whileTap={{scale: 1.1}}
                        whileHover={{color: '#ECCF94'}}
                          className={styles.menu_text}
                          onClick={() => {
                            router.push(item.link)
                          }}>{item.label}</motion.div>
                      </Col>
            })
          }

        </Row>
      </div>
    </Container>

  )
}

export default Header
