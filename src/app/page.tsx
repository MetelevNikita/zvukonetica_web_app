import { FC } from 'react'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components
import Main from '@/components/Main/Main'
import Question from '@/components/Question/Question'

const page: FC = () => {
  return (
    <Container>

      <Row className='mt-4 mb-4'>
        <Col>
          <Main />
        </Col>
      </Row>


      {/* question */}

      <Row>
        <Col>

          <Question />
        
        </Col>
      </Row>
    </Container>
  )
}

export default page
