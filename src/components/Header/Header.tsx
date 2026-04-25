'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"

// 

import { FaAlignJustify } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

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
      link: 'https://vk.ru/club235259626',
      image: vk
    },
    {
      id: 2,
      label: 'Телеграм',
      value: 'tg',
      link: 'https://max.ru/join/JBTIpN9A35jkobkUNUH-iM2MZV5Qq_vygEsNJV_-zlY',
      image: tg
    },

  ]

  const [menuActive, setMenuActive] = useState<Boolean>(false)

  console.log(menuActive)



  return (

    <Container>

      <div className={styles.header_container}>
        <Row className='d-flex flex-row justify-content-center align-items-center wv-100'>

          <Col md={8} sm={12} xs={12} className='d-flex justify-content-md-start justify-content-center mt-4'>

              <Row md={12} xs={12} className='d-flex justify-content-center'>

                <Col md={12} xs={10} className='d-flex justify-content-center'>
                    <motion.div
                      initial={{opacity: 0, x: 0}} animate={{opacity: 1, x: -10}} transition={{duration: 1}}
                      className={styles.logo_container}
                      whileHover={{scale: 1.1}}
                      onClick={() => {router.push('/')}}
                      >
                        <Image className={styles.logo} src={logo} alt={logo} />
                    </motion.div>
                </Col>

                <Col xs={2} className='d-flex justify-content-end d-flex d-block d-sm-none'>
                  <div
                    className={styles.burger_menu_container}
                    onClick={() => {
                      setMenuActive(prev => !prev)
                    }}
                  >
                    {
                      (menuActive) ? <IoClose /> : <FaAlignJustify/>
                    }
                  </div>
                </Col>



              </Row>

          </Col>


          <Col md={2} className='d-flex justify-content-md-end justify-content-start mt-4'>

          <div className={styles.social_logo_container}>

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

          </div>

          </Col>

          <Col md={2} className='d-flex justify-content-md-end justify-content-center mt-4'>
              <MyButton
                text={'Написать'}
                onClick={() => {
                  router.push('/contacts')
                }}
              />
          </Col>

        </Row>


        <Row className='d-flex justify-content- mt-4'>
            <motion.div
              initial={{scaleX: 0.6}}
              animate={{scaleX: 1}}
              transition={{duration: 3}}
              className={styles.menu_line}>
            </motion.div>
        </Row>


        {/* desctop */}

        <Row className='d-flex justify-content-center mt-3 d-none d-md-block d-lg-none'>

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


        {/* mobile */}

            <Row className='d-flex d-block d-sm-none'>
              <Col md={12}>
                <motion.div
                  className={styles.menu_mobile_container}
                  initial={{ left: -600 }}
                  animate={(menuActive) ? { left: 0 } : { left: -600 }}
                  transition={{duration: 1}}
                >

                  <div className={styles.menu_mobile_wrapper}>

                      {
                        menu.map((item) => {
                          return (
                            <Col>
                              <motion.div
                                className={styles.menu_mobile_item}
                                whileHover={{color: '#E1BF81'}}
                                onClick={() => {
                                  router.push(item.link)
                                  setMenuActive(false)
                                }}
                              >
                                {item.label}
                              </motion.div>
                            </Col>
                          )
                        })
                      }

                  </div>

                </motion.div>
              </Col>
            </Row>




      </div>
    </Container>

  )
}

export default Header
