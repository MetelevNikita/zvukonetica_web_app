'use client'

import { FC } from 'react'

// style

import styles from './Enjoy.module.css'

// bootstrap

import { Container, Col, Row } from 'react-bootstrap'
import MyButton from '@/ui/MyButton/MyButton'

// 

const Enjoy: FC = () => {
  return (


      <div  className={styles.enjoy_bg}>

        <Container fluid>
          
          <Row className='d-flex align-items-center justify-content-center' style={{height: '276px'}}>
            
            <Col md={8} className='d-flex align-items-center justify-content-center'>
              <div className={styles.enjoy_title}>
                «Вас слышат не тогда, когда вы говорите громче. Вас слышат, когда вы говорите с той частотой, на которой слушатель готов резонировать.»
              </div>
            </Col>
            
            <Col md={4} className='d-flex align-items-center justify-content-center'>
              <MyButton text={'Присоеденяйтесь'} onClick={() => {}} />
            </Col>
            
          </Row>
        </Container>

      </div>



  )
}

export default Enjoy
