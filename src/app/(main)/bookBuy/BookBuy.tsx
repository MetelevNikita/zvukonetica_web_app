'use client'

import {FC} from 'react'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'motion/react'

// style

import styles from './BookBuy.module.css'

// img

import book from '@/../public/app/book_buy/book_cover.png'

// 

interface BookBuyInterface {
  payment: any
}

const BookBuy: FC<BookBuyInterface> = ({ payment }) => {



const { setPaymentState } = payment


function buyBookHandler () {
  setPaymentState((prev: boolean) => !prev)
}



  return (
    <section className={styles.book_buy} aria-labelledby='book-buy-title'>
      <Container className={styles.container}>
        <Row className={`g-0 ${styles.row}`}>
          <Col lg='auto' className={styles.artwork}>
          <motion.div
            transition={{
              delay: 0.4,
              duration: 2
            }}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
          >
            <img src='/app/book_buy/ring_outer.svg' alt='' width={552} height={552} className={styles.ring_outer} />
            <img src='/app/book_buy/ring_inner.svg' alt='' width={472} height={472} className={styles.ring_inner} />
            <img src='/app/book_buy/ring_ellipse.svg' alt='' width={540} height={400} className={styles.ring_ellipse} />
          </motion.div>


            <motion.div
              transition={{
                delay: 0.4,
                duration: 1
              }}
              initial={{
                rotate: -5,
                opacity: 0
              }}
              whileInView={{
                rotate: 0,
                opacity: 1
              }}
              className={styles.cover}
            >
              <Image src={book} alt='Обложка книги «Звуконетика» Нины Филипповой' className={styles.image} sizes='347px' />
              <div className={styles.spine} aria-hidden='true' />
            </motion.div>
          </Col>
          <Col lg='auto' className={styles.content}>
            <p className={styles.label}>Книга автора методики</p>
            <h2 id='book-buy-title' className={styles.title}>Звуконетика —<br />в вашей библиотеке</h2>
            <p className={styles.quote}>«Ваш голос оставляет отпечаток. Вопрос только — какой именно вы хотите оставить?»</p>
            <ul className={styles.features}>
              <li>Твёрдый переплёт</li>
              <li>Доставка по России</li>
            </ul>
            <p className={styles.price}>3 500 ₽</p>
            <motion.button
              onClick={() => {
                buyBookHandler()
              }}
              type='button'
              className={styles.button}
              whileHover={{scale: 0.95}}
              whileTap={{scale: 1.1}}
            >
              Купить книгу
            </motion.button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BookBuy
