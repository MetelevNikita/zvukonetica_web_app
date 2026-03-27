'use client'

import { FC } from 'react'

// style

import styles from './Receive.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// json

import receiveJson from '@/json/receive.json' assert { type: 'json' }

// components

import RecieiveBlock from '@/module/recieiveBlock/recieiveBlock'
import MainTitle from '@/ui/mainTitle/mainTitle'




const Receive = () => {
  return (

    <Container>
      <MainTitle title={'ЧТО ВЫ ПОЛУЧАЕТЕ'}/>
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

export default Receive
