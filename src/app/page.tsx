import { FC } from 'react'

// style

import styles from './page.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components
import Main from '@/components/Main/Main'
import Participants from '@/components/Participants/Participants'
import Question from '@/components/Question/Question'
import Modules from '@/components/Modules/Modules'
import Receive from '@/components/Receive/Receive'
import Author from '@/components/Author/Author'
import Enjoy from '@/components/Enjoy/Enjoy'
import Articles from '@/components/Articles/Articles'


// 


const page: FC = () => {
  return (
    <Container className='mt-5' fluid>

      <Row className='mt-4 mb-4'>
        <Col>
          <Main />
        </Col>
      </Row>

      <Row>
        <Col>
          <Participants />
        </Col>
      </Row>


      {/* modules */}

      <Row className='d-flex flex-column mt-4 mb-4'>

        <Col>
          <Modules />
        </Col>
      </Row>

      {/* works */}



      <Row className='d-flex flex-column mt-4 mb-4'>
        <Col>
          <Receive />
        </Col>
      </Row>


      {/* Author */}


      <Row className='d-flex flex-column mt-4 mb-4'>
        <Col>
          <Author />
        </Col>
      </Row>



      {/* Enjoy */}


      <Row className='mt-5 mb-5'>
        <Col>

          <Enjoy />
        
        </Col>
      </Row>


      <Row>
        <Col>
          <Articles />
        </Col>
      </Row>


    </Container>
  )
}

export default page
