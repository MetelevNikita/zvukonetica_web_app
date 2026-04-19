import { FC } from 'react'

// styles

import styles from './MyFile.module.css'

// components

import MyButton from '../MyButton/MyButton'


interface MyFileProps {
  name: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MyFile: FC<MyFileProps> = ({ onChange }) => {



  return (
    
    <label htmlFor='fileInput' className={styles.my_file}>
      <MyButton text={'Загрузить файл'} onClick={() => {}} />
      <input id='fileInput' type='file' className={styles.file_input} onChange={onChange}/>
      <span className={styles.file_span}>Выберите файл</span>
    </label>
  )
}

export default MyFile