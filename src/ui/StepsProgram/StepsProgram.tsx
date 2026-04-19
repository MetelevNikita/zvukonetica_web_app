import { FC } from 'react'

// styles

import styles from './StepsProgram.module.css'


// 


interface StepsProgramProps {
  title: string,
  subtitle: string,
  list: string[]
}

const StepsProgram: FC<StepsProgramProps> = ({ title, subtitle, list }) => {
  return (
    
    <div className={styles.steps_program_container}>
      <div className={styles.steps_program_wrapper}>

        <div className={styles.steps_program_title}>{title}</div>
        <div className={styles.steps_program_subtitle}>{subtitle}</div>

        <ul className={styles.steps_program_list_container}>
          {list.map((item: string): React.ReactNode => {
            return (
              <li className={styles.steps_program_list_item}>{item}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default StepsProgram