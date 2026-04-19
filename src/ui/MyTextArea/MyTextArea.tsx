
import { FC, useRef } from 'react'

// styles

import styles from './MyTextArea.module.css'

interface MyTextAreaProps {
  title?: string
  name: string
  placeholder: string
  value: string
  onChange: (e: any) => void
}

const MyTextArea: FC<MyTextAreaProps> = ({title, name, placeholder, value, onChange }) => {

  return (
    <div className={styles.area_container}>

      {
        (title) && <span className={styles.area_title}></span>
      }
      <textarea
        name={name}
        className={styles.area_text}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default MyTextArea