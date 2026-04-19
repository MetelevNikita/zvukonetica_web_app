import { FC } from 'react'

// 

import styles from './Steps.module.css'

// 

interface StepsProps {
  num: number
  title: string
}

const Steps: FC<StepsProps> = ({ num, title }) => {
  return (
    <div className={styles.steps_container}>

      <div className={styles.steps_wrapper}>

        <div className={styles.steps_item_num}>{num}</div>
        <div className={styles.steps_item_title}>{title}</div>

      </div>


    </div>
  )
}

export default Steps