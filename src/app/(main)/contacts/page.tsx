'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

// styles

import styles from './page.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import { getBanner } from '@/lib/getBanner'

// components

import MyInput from '@/ui/MyInput/MyInput'
import MyTextArea from '@/ui/MyTextArea/MyTextArea'
import MyCheckBox from '@/ui/MyCheckBox/MyCheckBox'
import MyButton from '@/ui/MyButton/MyButton'

// 

import { postComment } from '@/lib/postComment'




const page: FC = () => {


  const router = useRouter()

  //

  const [message, setMessage] = useState<{name: string, email: string, comment: string, politic: boolean}>({
    name: '',
    email: '',
    comment: '',
    politic: false
  })

  const [bannerUrl, setBannerUrl] = useState<string | null>(null)

  useEffect(() => {
    async function getBannerUrl () {
      const url = await getBanner()
      console.log(url)

      if (!url) return 'Баннер не найден'

      setBannerUrl(url)
    }

    getBannerUrl()
  }, [])


  async function sendCommentMessage (message: {name: string, email: string, comment: string, politic: boolean}) {
    try {

      const post = await postComment(message)
      
      if (!post.success) {
        alert('Ошибка отправки комментария')
        return
      }

      alert('Комментарий отправлен')
      setMessage({
        name: '',
        email: '',
        comment: '',
        politic: false
      })

      
    } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error('Error fetching post comment:', error.message)
      return `Error fetching post comment: ${error.message}`
    }

    console.error('unknow error:', error)
    return `unknow error: ${error}`
  }
  }



  if (!bannerUrl) {
    return (

      <Container>
          <Row>
            <Col md={12} className='d-flex justify-content-center mb-5'>
                <h3 style={{color: 'white', height: '100vh'}}>LOADING...</h3>
            </Col>
          </Row>
      </Container>
    )
    
  }


  return (
    
    <Container>

      <Row className='mb-2'>
        <Col md={12} className='d-flex justify-content-center mb-5'>

          <Image style={{borderRadius: '10px'}} width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

        </Col>
      </Row>

      {/*  */}


      <Row className='mb-5'>
        <Col>

          <div className={styles.contacts_title}>Контакты</div>
        
        </Col>
      </Row>


      <Row className='d-flex justify-content-between mb-3'>

        <Col md={6} xs={12}>
          <MyInput type={'text'} placeholder={'Имя'} name={'name'} value={message.name} onChange={(e) => {setMessage({...message, name: e.target.value})}} />
        </Col>

        <Col md={6} xs={12}>
          <MyInput type={'email'} placeholder={'Почта'} name={'email'} value={message.email} onChange={(e) => {setMessage({...message, email: e.target.value})}} />
        </Col>

      </Row>

      <Row className='d-flex justify-content-between mb-3'>
        <Col>
          <MyTextArea name={'comment'} placeholder={'Комментарий'} value={message.comment} onChange={(e) => {setMessage({...message, comment: e.target.value})}} />
        </Col>
      </Row>

      <Row className='d-flex justify-content-between align-items-center mb-5'>

        <Col md={6} xs={12} className='d-flex justify-content-md-start justify-content-center'>
          <MyCheckBox name={'politic'} text={'Я согласен с политикой конфиденциальности'} checked={message.politic} onChange={(e) => {setMessage({...message, politic: e.target.checked})}} />
        </Col>


         <Col md={6} xs={12} className='d-flex justify-content-md-end justify-content-center'>
          <MyButton text={'Отправить'} onClick={async () => {await sendCommentMessage(message)}} />
         </Col>

      </Row>






    </Container>
  )
}

export default page