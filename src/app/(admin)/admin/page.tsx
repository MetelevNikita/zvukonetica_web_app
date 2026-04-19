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

  console.log(article)


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
              <MyFile name={''} placeholder={''} onChange={(e) => {setArticle({ ...article, ['file']: e.target.files })}} />
        </Col>


      </Row>
    </Container>
  )
}

export default page