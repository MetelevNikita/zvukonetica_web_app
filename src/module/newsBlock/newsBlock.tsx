import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// style

import styles from './newsBlock.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'


interface newsBlockProps {
  title: string,
  description: string,
  image: string,
}


const newsBlock: FC<newsBlockProps> = ({ title, description, image }) => {
  const descriptionShort = description.split(' ').slice(0, 20).join(' ') + '...'

  return (
    <Container>
      <Row className='d-flex flex-column'>
        <Col md={12} className='d-flex justify-content-center'>
          <div className={styles.news_block_image_wrapper}>
              <Image src={image} alt="News Image" width={500} height={300} />
          </div>
        </Col>

        <Col>
          <div className={styles.news_block_title}>{title}</div>
        </Col>

        <Col>
          <div className={styles.news_block_line}></div>
        </Col>

        <Col>
          <div className={styles.news_block_description}>{descriptionShort}</div>
        </Col>

      </Row>
    </Container>

  )
}

export default newsBlock
