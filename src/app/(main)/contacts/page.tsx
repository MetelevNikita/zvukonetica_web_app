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

  const [comment, setComment] = useState<{name: string, email: string, message: string, politic: boolean}>({
    name: '',
    email: '',
    message: '',
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


  async function sendCommentMessage (comment: {name: string, email: string, message: string, politic: boolean}) {
    try {

      const { name, email, message, politic } = comment

      if (name.trim().length < 1 || email.trim().length < 1 || message.trim().length < 1) {
        // место под модальное окно
        alert('Все поля должны быть заполнены')
        return
      }

      if (!politic) {
        alert('Для отправки сообщения вы должны согласиться с политикой конфиденциальности')
        return 
      }


      const post = await postComment(comment)
      
      if (!post.success) {
        alert('Ошибка отправки комментария')
        return
      }

      alert('Комментарий отправлен')
      setComment({
        name: '',
        email: '',
        message: '',
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

      <Container className='mt-4'>
          <Row>
            <Col md={12} className='d-flex justify-content-center mb-5'>
                <h3 style={{color: 'white', height: '100vh'}}>LOADING...</h3>
            </Col>
          </Row>
      </Container>
    )
    
  }


  return (
    
    <Container className='mt-4'>

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


      <Row className='d-flex justify-content-between'>

        <Col md={6} xs={12} className='mt-2 mb-2'>
          <MyInput type={'text'} placeholder={'Имя'} name={'name'} value={comment.name} onChange={(e) => {setComment({...comment, name: e.target.value})}} />
        </Col>

        <Col md={6} xs={12} className='mt-2 mb-2'>
          <MyInput type={'email'} placeholder={'Почта'} name={'email'} value={comment.email} onChange={(e) => {setComment({...comment, email: e.target.value})}} />
        </Col>

      </Row>

      <Row className='d-flex justify-content-between mt-2 mb-2'>
        <Col>
          <MyTextArea name={'comment'} placeholder={'Комментарий'} value={comment.message} onChange={(e) => {setComment({...comment, message: e.target.value})}} />
        </Col>
      </Row>

      <Row className='d-flex justify-content-between align-items-center mb-5'>

        <Col md={6} xs={12} className='d-flex justify-content-md-start justify-content-center'>
          <MyCheckBox name={'politic'} text={'Я согласен с политикой конфиденциальности'} checked={comment.politic} onChange={(e) => {setComment({...comment, politic: e.target.checked})}} />
        </Col>


         <Col md={6} xs={12} className='d-flex justify-content-md-end justify-content-center mt-4'>
          <MyButton text={'Отправить'} onClick={async () => {await sendCommentMessage(comment)}} />
         </Col>

      </Row>






    </Container>
  )
}

export default page