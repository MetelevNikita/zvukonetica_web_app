'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 

import { Container, Row, Col } from 'react-bootstrap'


import styles from './page.module.css'

// 

import MyInput from '@/ui/MyInput/MyInput'
import MyButton from '@/ui/MyButton/MyButton'
import MyTextArea from '@/ui/MyTextArea/MyTextArea'
import MyFile from '@/ui/MyFile/MyFile'

// 

import NewsBlock from '@/module/newsBlock/newsBlock'

const page: FC = () => {

  const router = useRouter()

  // 

  const [article, setArticle] = useState<any>({})
  const [articles, setArticles] = useState<any[]>([])
  const [banner, setBanner] = useState<any>({})


  useEffect(() => {
    (async function () {
      const data = await getAllNews()

      if (!data && !data.data) return 

      setArticles(data.data)
    })()
  }, [])



  // BAANER

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
      alert('Баннер успешно сохранен')
      router.refresh()

      return { success: true, message: 'Баннер успешно сохранен' }

    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при отправке данных:', error.message)
        alert(`Ошибка при отправке данных: ${error.message}`)
        return { success: false, message: error.message }
      } else {
        console.error('Неизвестная ошибка:', error)
        return { success: false, message: 'Неизвестная ошибка' }
      }
    }
  }


  // ARTICLES


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

      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log('Ответ от сервера:', data)
      alert('Новость успешно создана')
      window.location.reload()


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

  // 

  async function getAllNews (): Promise<any> {
    try {

      const responce = await fetch('/api/articles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await responce.json()
      return data
      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error('Ошибка получения всех новостей:', error.message)
        return { success: false, message: error.message, data: null }
      } else {
        console.error('Неизвестная ошибка:', error)
        return { success: false, message: 'Неизвестная ошибка', data: null}
      }
    }
  }


  async function handleDeleteArticle (id: string) {
    try {

      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Ошибка удаления ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      alert(`Новость ${id} успешно удалена`)
      window.location.reload()
      return data
      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error('Ошибка удвления новости:', error.message)
        return { success: false, message: error.message, data: null }
      } else {
        console.error('Неизвестная ошибка:', error)
        return { success: false, message: 'Неизвестная ошибка', data: null}
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

      <Row className='mt-5 mb-5'>
          <Col>
            <MyButton text={'Сохранить'} onClick={() => {
              handleNewArticle(article)
            }} />
        </Col>
      </Row>


      {/* All NEWS */}


      <Row className='mt-5 mb-5'>

        {
          (articles.length >= 1) && articles.map((item: any, index: number) => {
            return (
            <Col md={4} xs={12} key={index}>
                <div>
                  <NewsBlock title={item.title} description={item.description} image={item.image} />
                  <MyButton text={'Удалить'} onClick={() => {
                    handleDeleteArticle(item.id)
                  }} />
                </div>
            </Col>
            )
          })
        }

      </Row>






      {/* BANNER */}

      <Row className='mb-5 mt-5'>
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