import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { FC } from 'react'
import { motion } from 'motion/react'

// style

import styles from './ImageForm.module.css'

// image

import bg from '@/../public/app/module_block/circle.png'

// 

interface ImageFormProps {
  image: StaticImageData
}

const ImageForm: FC<ImageFormProps> = ({ image }) => {
  return (
    <div className={styles.image_bg}>

      <Image width={262} height={259} src={image} alt={'картинка'}/>
      
    </div>
  )
}

export default ImageForm
