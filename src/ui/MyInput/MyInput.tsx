
import { FC, useRef } from 'react'

// styles

import styles from './MyInput.module.css'

interface MyInputProps {
  title?: string
  name: string
  type: string
  placeholder: string
  value: any
  onChange: (e: any) => any
}

const MyInput: FC<MyInputProps> = ({title, name, type, placeholder, value, onChange }) => {

  return (
    <div className={styles.input_container}>

      {
        (title) && <span className={styles.input_title}></span>
      }
      <input
        name={name}
        className={styles.input_text}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default MyInput