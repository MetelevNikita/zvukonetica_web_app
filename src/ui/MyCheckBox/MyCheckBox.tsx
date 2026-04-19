import { FC } from 'react'

// styles 

import styles from './MyCheckBox.module.css'

interface MyCheckBoxProps {
  text: string
  name: string
  checked: boolean
  onChange: (e: any) => void
}

const MyCheckBox: FC<MyCheckBoxProps> = ({ text, name, checked, onChange }) => {
  return (
    <div className={styles.checkbox_container}>
      <input className={styles.checkbox} name={name} type='checkbox' checked={checked} onChange={onChange}/>
      <span className={styles.checkbox_text}>{text}</span>
    </div>
  )
}

export default MyCheckBox