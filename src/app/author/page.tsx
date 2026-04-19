'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

// style

import styles from './page.module.css'

// bootstrap

import { Container, Col, Row } from 'react-bootstrap'

// img

import photo from '@/../public/app/author/photo_author.png'
import rulesImage from '@/../public/app/author_page/author_banner_2.png'

// functions

import { getNewsBanner } from '@/components/OpenArticle/OpenArticle'

// json

import diplomsJson from '../../json/diplom.json' with {type: 'json'}


const page: FC = () => {


    const [bannerUrl, setBannerUrl] = useState<string>('')


  useEffect(() => {
    const fetchBanner = async () => {
      const url = await getNewsBanner()
      if (url) {
        setBannerUrl(url)
      }

    }
    fetchBanner()
  }, [])


  if (!bannerUrl) {
    return (
      <div>loading</div>
    )
  }

  console.log(bannerUrl)


  return (
    <Container>

      <Row className='mb-5'>
        <Col md={12} className='d-flex justify-content-center mb-5'>
            <Image className={styles.author_banner} width={1920} height={109} src={bannerUrl} alt="News Banner" />
        </Col>
      </Row>


      <Row className='mt-5'>
          <Col md={7} className='d-flex justify-content-start'>
              <div>
                <div style={{whiteSpace: 'pre-line'}} className={styles.author_title}>Автор методики</div>

                <p style={{whiteSpace: 'pre-line'}} className={styles.author_info}>«Ваш голос оставляе отпечаток. 
                 Вопрос только — какой именно вы хотите оставить?»
                </p>

                <div style={{whiteSpace: 'pre-line'}} className={styles.author_yellow_text}>
                  {`Автор метода\n\nНина Мироновна Филиппова`}
                </div>

                <p style={{whiteSpace: 'pre-line'}} className={styles.author_description}>{`Эксперт в области креативных технологий управления, развития человеческого потенциала и инновационных образовательных методов.\n
                Автор более 30 научных и учебно-методических пособий, посвящённых вопросам самоорганизации, самоуправления, соучастия, вовлеченности и развитию управленческих компетенций.\n
                Награждена грамотами и благодарственными письмами муниципального, регионального и федерального уровня за вклад в развитие организаций и территорий.\n
                Получила положительные отзывы и рекомендации от руководителей государственных и муниципальных органов власти, а также представителей бизнеса, что подтверждает высокий уровень профессионального мастерства и деловой репутации.`}
                </p>

              </div>
          </Col>


          <Col md={5} className='d-flex justify-content-end'>
              <div className={styles.author_photo_bg}>
                <Image className={styles.author_photo} width={472} height={454} src={photo} alt={'photo'} />
              </div>
          </Col>

      </Row>


      <Row>
        <Col className='d-flex flex-column'>
          <div style={{whiteSpace: 'pre-line'}} className={styles.author_text}>Обладает опытом разработки и внедрения технологий проектной деятельности в сфере социального, финансово-хозяйственного и научно-исследовательского проектирования.</div>

          <Image width={1920} height={212} alt='rules image' src={rulesImage}/>
        </Col>
      </Row>

      <Row>
        <Col>

          <div style={{whiteSpace: 'pre-line'}} className={styles.author_text}>
            Методолог НКО-сектора, эксперт по разработке и сопровождению социально значимых проектов и образовательных программ.
          </div>

          <div style={{whiteSpace: 'pre-line'}} className={styles.author_text}>{`Более 30 лет работает с руководителями, предпринимателями и управленческими командами, помогая обеспечивать устойчивое лидерство, развивать управленческое мышление и формировать новые способы взаимодействия с людьми и обстоятельствами.\nМетод звуконетики стал результатом многолетней практики междисциплинарного характера на стыке организационного управления, синергетики, музыкальной педагогики, психологии, акустики, теории звука и теории поля.\nСегодня он применяется для развития личного и командного влияния, управленческого мастерства и достижения целей в условиях роста внутренних рисков, внешних угроз и неопределённости будущего.`}</div>

        </Col>
      </Row>


      <Row>
        <Col md={12}>
          <div className={styles.author_price_text}>ГРАМОТЫ И БЛАГОДАРСТВЕННЫЕ ПИСЬМА</div>
        </Col>
      </Row>

      <Row className='mb-5'>
        {
          (diplomsJson.length > 1) && diplomsJson.map((item: {id: number, title: string, image: string}, index: number) => {

            if (index > 3) {
              return
            }
            return <Col key={index} md={3} className='mb-5 mt-5'>
                      <Image width={258} height={298} src={item.image} alt={'diploms'}/>
                    </Col>
          }) 
        }
      </Row>


    </Container>

  )
}

export default page