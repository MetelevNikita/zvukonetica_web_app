'use client'

import { FC, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

// style

import styles from './page.module.css'

// 

import MyInput from '@/ui/MyInput/MyInput'
import MyButton from '@/ui/MyButton/MyButton'

// auth handler

import { authAdminHandler } from '@/lib/authAdminUser'

const page: FC = () => {

  const router = useRouter()

  const [authData, setAuthData] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })

  //


  async function authAdmin (authData: {email: string, password: string}) {

    try {

      const data = await authAdminHandler(authData)

      if (!data.success) {
        alert(data.message)
        return
      }

      alert(data.message)
      router.push('/admin')
      console.log(data)
      return data
      
    } catch (error: Error | unknown) {
      console.error(error)
      return error
    }

      
  }


  return (
    <Container className='d-flex flex-column justify-content-center vh-100'>

      <Row className='mb-5'>
        <Col>
          <h2 className={styles.auth_title}>Login</h2>
        </Col>
      </Row>


      <Row className='d-flex flex-column justify-content-center mb-4'>
        <Col md={12} className='mb-3'>
          <MyInput
            name={'email'}
            type={'text'}
            placeholder={'введите почту'}
            value={authData.email}
            onChange={(e: any) => {
              setAuthData({...authData, email: e.target.value})
            }}
          />
        </Col>

        <Col md={12} className='mb-3'>
          <MyInput
            name={'password'}
            type={'password'}
            placeholder={'введите пароль'}
            value={authData.password}
            onChange={(e: any) => {
              setAuthData({...authData, password: e.target.value})
            }}
          />
          </Col>
      </Row>

      <Row>
        <Col className='d-flex justify-content-center'>
          <MyButton text={'Войти'} onClick={() => authAdmin(authData)} />
        </Col>
      </Row>

    </Container>
  )
}

export default page