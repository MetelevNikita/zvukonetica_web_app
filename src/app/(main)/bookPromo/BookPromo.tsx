'use client'

import { FC } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

// style

import styles from './BookPromo.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// img

import book from '@/../public/app/book_promo/book_cover.png'

const BookPromo: FC = () => {

  function buyBookHandler () {
    console.log('BuyBook')
    alert('Страница находится в разработке')
  }



  return (
    <section className={styles.book_promo_bg} aria-labelledby='book-promo-title'>
      <div className={styles.book_promo_band}>
        <Container className={styles.book_promo_container}>
          <Row className={`g-0 align-items-center justify-content-between ${styles.book_promo_row}`}>

            <Col lg='auto' className={styles.book_promo_content}>
              <p className={styles.book_promo_label}>
                Не готовы к курсу? Начните с книги
              </p>
              <h2 id='book-promo-title' className={styles.book_promo_title}>
                Книга «Звуконетика»
              </h2>
              <p className={styles.book_promo_description}>
                Метод Н.М. Филипповой — в формате, к которому можно возвращаться.
              </p>
              <div className={styles.book_promo_action}>
                <motion.button
                  onClick={() => {
                    buyBookHandler()
                  }}
                  type='button'
                  className={styles.book_promo_button}
                  whileHover={{scale: 0.95}}
                  whileTap={{scale: 1.1}}
              >
                Купить за 3 500₽
              </motion.button>
              </div>
            </Col>

            <Col lg='auto' className={styles.book_promo_books}>
              <motion.div
                initial={{opacity: 0, scale: 0.5}}
                  whileInView={{opacity: 1, scale: 1}}
                  transition={{
                    delay: 0.2,
                    duration: 1
                }}
                className={styles.book_promo_back}
                aria-hidden='true'>
              </motion.div>
                
                
                
                <motion.div
                  initial={{opacity: 0.8, scale: 0.5}}
                  whileInView={{opacity: 1, scale: 1}}
                  transition={{
                   duration: 1
                  }}
                  >
                    <div className={styles.book_promo_cover}>
                          <Image src={book} alt='Обложка книги «Звуконетика» Нины Филипповой' className={styles.book_promo_image} sizes='325px' />
                          <div className={styles.book_promo_spine} aria-hidden='true' />
        
                    </div>
                </motion.div>
            </Col>

          </Row>
        </Container>
      </div>
    </section>
  )
}

export default BookPromo
