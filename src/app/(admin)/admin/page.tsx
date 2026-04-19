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

  let [article, setArticle] = useState<any>({})
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<Boolean>(true)



  useEffect(() => {

    if (!article.image) {
      console.log('нет файла')
      return
    }

    console.log(`Началась обработка фотографии ${article.image.name}`)

    setConvertedImage(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const fileContent = e.target?.result

      if (typeof fileContent === 'string') {
        console.log('Файл успешно прочитан и преобразован в base64')
        setConvertedImage(false)
      } else {
        console.error('Ошибка при чтении файла: результат не является строкой')
        return
      }
      setBase64Image(fileContent || null)
    }

    reader.onerror = (e) => {
      console.error('Ошибка при чтении файла:', e)
      setBase64Image(null)
      setConvertedImage(false)
    }

    reader.onabort = () => {
      console.error('Чтение файла было прервано')
      setBase64Image(null)
      setConvertedImage(false)
    }

    reader.readAsDataURL(article.image)

  }, [article.image])




  async function handleNewArticle (article: {title: string, description: string, image: string}): Promise<{ success: boolean; message: string } | Error> {
    try {

      if (!article.title || !article.description || !article.image) {
        alert('Пожалуйста, заполните все поля и загрузите изображение.')
        return {
          success: false,
          message: 'Пожалуйста, заполните все поля и загрузите изображение.'
        }
      }

      if (!base64Image && convertedImage) {
        alert('Изображение обрабатывается. Пожалуйста, подождите несколько секунд и попробуйте снова.')
        return {
          success: false,
          message: 'Изображение обрабатывается. Пожалуйста, подождите несколько секунд и попробуйте снова.'
        }
      }


      if (!base64Image && article.image) {
        throw new Error('Изображение еще не обработано. Подождите несколько секунд и попробуйте снова.')
      }

      let currentArticle = { ...article, image: base64Image }
      console.log('Данные для отправки:', currentArticle)

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentArticle)
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
              <MyFile data={article} name={''} placeholder={''} onChange={(e) => {setArticle({ ...article, ['image']: e.target.files?.[0] as File  })}} />
        </Col>

      </Row>

      <Row className='mt-5'>
          <Col>

          {
            (convertedImage) ? (
              <div className={styles.converting}>Изображение пока не загружено</div>
            ) : (<MyButton text={'Сохранить'} onClick={async () => {
              await handleNewArticle(article)
            }} />)
          }
        </Col>
      </Row>
    </Container>
  )
}

export default page