'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {motion} from 'motion/react'

// styles

import styles from './page.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import { getBanner } from '@/lib/getBanner'




const page: FC = () => {


  const router = useRouter()

  async function getYaImage () {

    const publicKey = 'https://disk.yandex.ru/d/QCP7VG3yARlQ7g'

    const responce = await fetch(`/api/gallery?publicKey=${encodeURIComponent(publicKey)}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const data = await responce.json()
    return data

  }


  const [openImage, setOpenImage] = useState<string | null>(null)
  const [images, setImages] = useState<{name: string, url: string, path: string, preview: string}[] | any>(null)
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


  useEffect(() => {
    async function getImage () {
      const data = await getYaImage()
      setImages(data.data)
      return data
    }

    getImage()
  }, [])


  console.log(openImage)




  if (!bannerUrl || !images) {

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


      {
        (openImage) && (
          <Row>
            <Col>

              <div className={styles.open_image_container}>


                <div className={styles.open_image_bg}>




                  <div className={styles.open_image}>

                      <motion.div
                        whileTap={{scale: 1.1}}
                        className={styles.close_iamge_container}
                        onClick={() => setOpenImage(null)}
                        >
                        <div className={styles.close_iamge_icon}>X</div>
                      </motion.div>

                      <Image style={{borderRadius: '10px'}} width={800} height={300} src={openImage} alt={'opne_image'} />
                  </div>

                </div>

              </div>
            
            </Col>
          </Row>
        )
      }



      <Row className='mb-2'>
        <Col md={12} className='d-flex justify-content-center mb-5'>

          <Image style={{borderRadius: '10px'}} width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

        </Col>
      </Row>

      {/*  */}


      <Row className='mb-5'>
        <Col>

          <div className={styles.gallery_title}>Фотогалерея</div>
        
        </Col>
      </Row>

      {/*  */}



      <Row className='mb-5'> 

        {
          images.map((item: {name: string, url: string, path: string, preview: string}, index: number): React.ReactNode => {
            return (
              <Col key={index} className='d-flex justify-content-center gap-10 mt-3 mb-3' style={{padding: 20}}>

                <div style={{  borderRadius: '20px', objectFit: 'cover'}} className={styles.gallery_image_container} onClick={(e) => {setOpenImage(item.url)}}>
                    <Image  src={item.preview} alt={item.name} width={400} height={100}/>
                </div>

              </Col>
            )
          })
        }


      </Row>

    </Container>
  )
}

export default page