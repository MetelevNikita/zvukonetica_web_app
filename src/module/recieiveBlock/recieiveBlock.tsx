
import { FC } from 'react'
import { motion } from 'motion/react'

// style

import styles from './recieiveBlock.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

interface RecieiveBlockProps {
  num: number | string
  title: string
  subtitle: string
}

const RecieiveBlock: FC<RecieiveBlockProps> = ({ num, title, subtitle }) => {
  return (

    <motion.div layout animate={{scale: 0.9, opacity: 0}} whileInView={{scale: 1, opacity: 1}} transition={{duration: 3}} className={styles.recieve_block_bg}>
      <Container>
        <Row>

          <Col md={1} xs={1} className='d-flex justify-content-center'>
            <div className={styles.recieve_block_num}>0{num}</div>
          </Col>

          <Col md={11} xs={11} className='d-flex justify-content-center'>

            <div className={styles.recieve_block_wrapper}>
              <div className={styles.recieve_block_title}>{title}</div>
              <div className={styles.recieve_block_subtitle}>{subtitle}</div>
            </div>
          
          </Col>


        </Row>
      </Container>
    </motion.div>

  )
}

export default RecieiveBlock
