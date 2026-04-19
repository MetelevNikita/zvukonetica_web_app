import { FC } from 'react'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import styles from './teamBlock.module.css'





interface TeamBlockProps {
  name: string
  direction: string
  image: StaticImageData | string
}

const TeamBlock: FC<TeamBlockProps> = ({ name, direction, image }) => {
  return (
    <Container>
      <Row className='d-flex flex-column'>

        <Col md={12} xs={12} className='d-flex justify-content-center mb-3'>
          <Image className={styles.team_block_image} width={360} height={330} src={image} alt={name} />
        </Col>

        <Col className='d-flex flex-column justify-content-md-start justify-content-center'>
          <h3 className={styles.team_block_info_title}>{name}</h3>
          <p className={styles.team_block_info_direction}>{direction}</p>
        </Col>

      </Row>
    </Container>
  )
}

export default TeamBlock