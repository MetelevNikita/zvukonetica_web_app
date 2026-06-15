'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Container, Row, Col } from 'react-bootstrap'

// 

import MyInput from '@/ui/MyInput/MyInput'
import MyButton from '@/ui/MyButton/MyButton'

// style

import styles from './page.module.css'
import { th } from 'motion/react-client'

const page = () => {

  const [data, setData] = useState<any | null>({})
  const router = useRouter()


  async function authUserHandler (data: {email: string, password: string}): Promise<any> {

    try {

      const response = await fetch ('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Ошибка API авторизации')
      }

      const res = await response.json()

      if (!res.success) {
        alert(res.mesagge)
        return
      }

      alert(res.message)
      router.push('/admin')

      return data
    } catch (error: Error | unknown) {


      if (error instanceof Error) {
        console.error(`error auth handler ${error.message}`)
        return
      }

      console.error(`unknown error ${error}`)
      return

    }
  }


  return (
    <Container className='d-flex flex-column justify-content-center vh-100'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <h2 className={styles.admin_title}>Admin page</h2>
        </Col>
      </Row>


      <Row className='d-flex flex-column justify-content-center mt-4'>
        <Col className='mt-2 mb-2'>
            <MyInput
              name={'email'}
              type={'text'}
              placeholder={'почта'}
              value={data.email ?? ''}
              onChange={(e) => {
                setData({...data, email: e.target.value})
              }}
            />
        </Col>
        <Col className='mt-2 mb-2'>
            <MyInput
              name={'password'}
              type={'password'}
              placeholder={'пароль'}
              value={data.password ?? ''}
              onChange={(e) => {
                setData({...data, password: e.target.value})
              }}
            />
        </Col>
      </Row>


      <Row>
        <Col className='d-flex justify-content-center mt-4'>
          <MyButton text={'Войти'} onClick={() => {
            authUserHandler(data)
          }} />
        </Col>
      </Row>
    </Container>
  )
}

export default page