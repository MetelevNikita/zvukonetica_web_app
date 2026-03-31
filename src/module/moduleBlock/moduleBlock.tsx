import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

// style

import styles from './moduleBlock.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import ImageForm from '@/ui/ImageCircle/ImageForm'

// 

interface moduleBlockProps {
  title: string
  subtitle: string
  list: any[]
  image: StaticImageData
  style: string
}

const ModuleBlock: FC<moduleBlockProps> = ({ title, subtitle, list, image, style}) => {

  return (

    <Container>
      <Row className={(style === 'left') ? 'd-flex justify-content-start' : 'd-flex justify-content-end'}>

        <Col md={4} className='d-flex justify-content-center'>

          <ImageForm image={image}/>

        </Col>


        <Col md={7}>

          <div className={styles.module_block_title}>{title}</div>
          <div className={styles.module_block_subtitle}>{subtitle}</div>

          <div className={styles.module_block_list_container}>

            <ul className={styles.module_block_list_wrapper}>
            {(list.length > 1) && list.map((item: {id: number, text: string}): React.ReactNode => {
              return (
                <li key={item.id} className={styles.module_block_list_elem}>{item.text}</li>
              )
            })}
            </ul>

  
          </div>
        
        </Col>



      </Row>
    </Container>

  )
}

export default ModuleBlock
