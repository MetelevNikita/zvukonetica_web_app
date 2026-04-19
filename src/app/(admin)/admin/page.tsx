'use client'

import { FC, useState, useEffect } from 'react'

// 

import { Container, Row, Col } from 'react-bootstrap'


import styles from './page.module.css'

// 

import MyInput from '@/ui/MyInput/MyInput'
import MyButton from '@/ui/MyButton/MyButton'
import MyTextArea from '@/ui/MyTextArea/MyTextArea'
import MyFile from '@/ui/MyFile/MyFile'

const page: FC = () => {

  const [article, setArticle] = useState<any>({})
  const [banner, setBanner] = useState<any>({})




  async function handleNewBanner (banner: {image: string}): Promise<{ success: boolean; message: string } | Error> {
    try {

      if (!banner.image) {
        alert('Пожалуйста, заполните все поля и загрузите изображение.')
        return {
          success: false,
          message: 'Пожалуйста, заполните все поля и загрузите изображение.'
        }
      }

      const formData = new FormData()
      formData.append('image', banner.image)

      console.log('Данные для отправки:', ...formData)

      const response = await fetch('/api/banner', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log('Ответ от сервера:', data)

      return { success: true, message: 'Баннер успешно сохранен' }

    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при отправке данных:', error.message)
        return { success: false, message: error.message }
      } else {
        console.error('Неизвестная ошибка:', error)
        return { success: false, message: 'Неизвестная ошибка' }
      }
    }
  }


    async function handleNewArticle (article: {title: string, description: string, image: string}): Promise<{ success: boolean; message: string } | Error> {
    try {

      if (!article.title || !article.description || !article.image) {
        alert('Пожалуйста, заполните все поля и загрузите изображение.')
        return {
          success: false,
          message: 'Пожалуйста, заполните все поля и загрузите изображение.'
        }
      }

      const formData = new FormData()
      formData.append('title', article.title)
      formData.append('description', article.description)
      formData.append('image', article.image)

      console.log('Данные для отправки:', ...formData)



      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log('Ответ от сервера:', data)





      return { success: true, message: 'Статья успешно сохранена' }


    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при отправке данных:', error.message)
        return { success: false, message: error.message }
      } else {
        console.error('Неизвестная ошибка:', error)
        return { success: false, message: 'Неизвестная ошибка' }
      }
    }
  }



  return (
    <Container>

      <Row className='mb-5'>
        <Col>

          <div className={styles.admin_title}>Новость</div>
        
        </Col>
      </Row>


      <Row className='d-flex flex-column'>
        <Col className='mt-2 mb-4'>
            <MyInput
              placeholder='Заголовок'
              name={'title'}
              type={'text'}
              value={article.title}
              onChange={(e) => {
                setArticle({ ...article, ['title']: e.target.value })
              }}
              />
        </Col>

        <Col>
              <MyTextArea
                name={'description'}
                placeholder='Содержание'
                value={article.description}
                onChange={(e) => {
                  setArticle({ ...article, ['description']: e.target.value })
                }}
                />
        </Col>


        <Col>
              <MyFile data={article} name={'article'} placeholder={''} onChange={(e) => {setArticle({ ...article, ['image']: e.target.files?.[0] as File  })}} />
        </Col>

      </Row>

      <Row className='mt-5'>
          <Col>
            <MyButton text={'Сохранить'} onClick={() => {
              handleNewArticle(article)
            }} />
        </Col>
      </Row>


      {/* BANNER */}

      <Row className='mb-5'>
        <Col>

          <div className={styles.admin_title}>Баннер</div>
        
        </Col>
      </Row>


      <Row className='mb-5'>
        <Col>

          <div className={styles.admin_info}>*Баннер должен быть размеров 1120x400</div>
        
        </Col>
      </Row>


      <Row className='d-flex flex-column'>

        <Col>
              <MyFile data={banner} name={'banner'} placeholder={''} onChange={(e) => {setBanner({ ...banner, ['image']: e.target.files?.[0] as File  })}} />
        </Col>

      </Row>

      <Row className='mt-5'>
          <Col>
            <MyButton text={'Сохранить'} onClick={() => {
              handleNewBanner(banner)
            }} />
        </Col>
      </Row>
    </Container>
  )
}

export default page