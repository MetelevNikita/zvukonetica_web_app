import { CSSProperties, FC } from 'react'
import { motion } from "motion/react"

// style

import styles from './MyButton.module.css'

// 

interface MyButtonProps {
  text: string
  onClick: () => void
  style?: CSSProperties
}

const MyButton: FC<MyButtonProps> = ({ text, onClick }) => {
  return (
    <motion.div
      whileTap={{scale: 1.1}}
      style={styles}
      className={styles.btn}
      onClick={onClick}>
        <div className={styles.btn_text}>
          {text}
        </div>
    </motion.div>
  )
}

export default MyButton
