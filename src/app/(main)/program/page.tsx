'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

// styles

import styles from './page.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import { getBanner } from '@/lib/getBanner'

// components

import MyInput from '@/ui/MyInput/MyInput'
import MyTextArea from '@/ui/MyTextArea/MyTextArea'
import MyCheckBox from '@/ui/MyCheckBox/MyCheckBox'
import MyButton from '@/ui/MyButton/MyButton'

// 

import TeamBlock from '@/module/teamBlock/teamBlock'
import ProgramModuleRules from '@/module/programModuleRules/programModuleRules'

// json

import teamData from '@/json/team.json' with {type: 'json'}
import programRules from '@/json/programRules.json' with {type: 'json'}




const page: FC = () => {


  const router = useRouter()

  //

  const [message, setMessage] = useState<{name: string, email: string, comment: string, politic: boolean}>({
    name: '',
    email: '',
    comment: '',
    politic: false
  })

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



  if (!bannerUrl) {
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

      <Row className='mb-2'>
        <Col md={12} className='d-flex justify-content-center mb-5'>

          <Image style={{borderRadius: '10px'}} width={1920} height={109} src={bannerUrl as string} alt={'banner'} />

        </Col>
      </Row>

      {/*  */}


      <Row className='mb-5'>
        <Col>

          <div className={styles.program_title}>Программа</div>
        
        </Col>
      </Row>

      {/*  */}



      <Row className='mb-5'> 

      {
        programRules.map((item, index) => (

            <Col md={4} className='d-flex justify-content-center' key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{ duration: 1, delay: index * 0.3 }}
                key={index}
              >
                
                    <ProgramModuleRules
                      title={item.title}
                      description={item.description}
                      rules={item.rules}
                      buttonText={item.buttonText}
                    />
              </motion.div>
            </Col>
 
        ))
        
      }

        <Col md={4} className='d-flex justify-content-center'>

            <motion.div 
              className={styles.program_module_rules_container}
              whileHover={{ scale: 1.05 }}
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{ duration: 1, delay: programRules.length * 0.3 }}
              >
                  <div className={styles.program_module_rules_title}>{`У вас есть вопросы по программе?\n\nНапишите нам и мы с радостью ответим вам!`}</div>
                  <div className={styles.program_module_rules_button_container}>
                    <MyButton text={'Написать'} onClick={() => {}} />
                  </div> 
            </motion.div>
          
        </Col>

      </Row>



      {/*  */}

      <Row className='mb-2'>
        <Col>

          <div className={styles.program_title}>Команда</div>
        
        </Col>
      </Row>


      <Row className='mb-5'>

        {(teamData as {name: string, direction: string, image: string}[]).map((member, index) => (
          <Col md={4} xs={12} className='d-flex justify-content-md-start justify-content-center' key={index}>
            <motion.div
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{ duration: 0.4, delay: index * 0.5 }}
            >
              <TeamBlock name={member.name} direction={member.direction} image={member.image} />
            </motion.div>
          </Col>
        ))}


      </Row>





    </Container>
  )
}

export default page