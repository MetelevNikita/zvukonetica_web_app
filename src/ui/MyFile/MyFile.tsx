import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

// styles

import styles from './MyFile.module.css'

// components

import MyButton from '../MyButton/MyButton'


interface MyFileProps {
  name: string
  data: any
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MyFile: FC<MyFileProps> = ({ data, onChange, name }) => {

  console.log('Данные в MyFile:', data)

  useEffect(() => {
      setFileUrl(data.image ? URL.createObjectURL(data.image) : null)
  }, [data.image])


  const [fileUrl, setFileUrl] = useState<any>()

  const handleDelete = () => {

    if (data.image) {
      data.image = null // Удаляем файл из данных
    }
    fileUrl && URL.revokeObjectURL(fileUrl) // Освобождаем память, удаляя URL объекта
    setFileUrl(null)


    console.log(data) // Проверяем, что файл удалён

    // Логика удаления файла
    console.log('Удалить файл')
  }

  return (

    <div className={styles.my_file_wrapper}>

      <label htmlFor={name} className={styles.my_file}>
        <MyButton text={'Загрузить файл'} onClick={() => {}} />
        <input id={name} type='file' className={styles.file_input} onChange={onChange}/>
        <span className={styles.file_span}>{data?.image?.name || 'Файл не выбран'}</span>
      </label>


      <div className={''}>

        {
          (fileUrl) && (
            <div>

              <div className={styles.delete_button} onClick={() => {handleDelete()}}>X</div>
              
              <div className={styles.file_preview}>
                <Image width={200} height={200} src={fileUrl} alt='Preview' />
              </div>
            </div>
          )
        }
        
      </div>

    </div>
    
  )
}

export default MyFile