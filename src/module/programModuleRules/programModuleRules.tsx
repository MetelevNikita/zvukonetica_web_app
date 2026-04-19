'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// 

import styles from './programModuleRules.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/ui/MyButton/MyButton'


interface ProgramModuleRulesProps {
  title: string,
  description: string,
  rules: {num: string, text: string}[]
  buttonText: string
}


const programModuleRules: FC<ProgramModuleRulesProps> = ({ title, description, rules, buttonText }) => {
  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center flex-column'>
        <Col className='d-flex justify-content-center flex-column'>

        <div className={styles.program_module_rules_container}>

          <div className={styles.program_module_rules_title}>{title}</div>
          
          <hr className={styles.program_module_rules_title_line}/>

          <div className={styles.program_module_rules_description}>{description}</div>

          {
            rules.map((rule, index) => (
              <div className={styles.program_module_rules_list_container} key={index}>
                <div className={styles.program_module_rules_list_item}>
                  <div className={styles.program_module_rules_list_left}>{rule.num}</div>
                  <div className={styles.program_module_rules_list_right}>{rule.text}</div>
                </div>

                <hr className={styles.program_module_rules_list_line}/>
              </div>
            ))
          }


          <div className={styles.program_module_rules_button_container}>
            <MyButton text={buttonText} onClick={() => {}} />
          </div>
          

        </div>
          

        </Col>
      </Row>
    </Container>
  )
}

export default programModuleRules