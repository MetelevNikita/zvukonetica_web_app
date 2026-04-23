'use clietn'

// 

import { FC, useState, useEffect, useRef } from 'react'

// styles

import styles from './swiperVideo.module.css'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// 

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles

interface SwiperVideoProps {
  video: any
}

const SwiperVideo:FC<SwiperVideoProps> = ({video}) => {

  const [activeMuted, setActiveMuted] = useState(0)
  const [activeIndex, setActiveIndex] = useState(10);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);


  console.log(videoRefs)


  return (
   <div className={styles.container}>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        pagination={{ clickable: true}}
        navigation={true}
        initialSlide={10}
        modules={[EffectCoverflow, Pagination, Navigation]}
        onSlideChange={(swiper) => {

          setActiveMuted(swiper.activeIndex)
          setActiveIndex(swiper.activeIndex)

    
          }
        }
        className={styles.swiper}
      >
        {video.map((item: string, index: number) => (
          <SwiperSlide key={item} className={styles.swiperSlide}>
            <video
              ref={el => {
                videoRefs.current[index] = el;
              }}
              src={item} 
              controls 
              className={styles.video}
              preload="metadata"
              muted
              
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperVideo