import { FC } from 'react'

// styles

import styles from './mainTitle.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// 

interface MainTitleProps {
  title: string
}

const MainTitle: FC<MainTitleProps> = ({ title }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={12} className='mt-3 mb-3'>
          <div className={styles.block_title}>{title}</div>
        </Col>
      </Row>
    </Container>
  )
}

export default MainTitle
