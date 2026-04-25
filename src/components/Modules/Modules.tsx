'use client'

import { FC } from 'react'
import { motion } from 'motion/react'

// style

import styles from './Modules.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import ModuleBlock from '@/module/moduleBlock/moduleBlock'
import MainTitle from '@/ui/mainTitle/mainTitle'

// json

import moduleJson from '../../json/module.json' with { type: 'json' }

// 

const Modules: FC = () => {

  return (
    <Container>
      
      <MainTitle title={'как это работает'}/>

      <Row>


        {

          moduleJson.map((item, index) => {
            if (index % 2 == 0) {
              return <motion.div
                          key={index}
                          layout
                          animate = {{opacity: 0, x: 20}}
                          whileInView={{opacity: 1, x: 0}}
                          transition={{duration: 2}}>
                            <ModuleBlock
                              style={'left'}
                              title={item.title}
                              subtitle={item.subtitle}
                              list={item.list}
                              image={item.image as any}
                            />
                      </motion.div>
            } else {
              return <motion.div
                        key={index}
                        layout
                        animate = {{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 2}}>
                          <ModuleBlock
                            style={'right'}
                            title={item.title}
                            subtitle={item.subtitle}
                            list={item.list}
                            image={item.image as any}
                          />
                      </motion.div>
            }
          })

        }

        
      </Row>
    </Container>
  )
}

export default Modules
