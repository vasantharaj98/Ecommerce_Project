import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Custcard } from '../card/Custcard';

export function SwiperCarousel({banner}) {

  const mod = [...banner].sort((a, b) => a.attribute - b.attribute);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
      {mod?.map((va,index)=>{
        return(
          <SwiperSlide key={index}>
            <img src={va?.image} alt='banner'></img>
          </SwiperSlide>
        )
      })}
      </Swiper>
    </>
  );
}

export function SwiperMultiCarousal({groupedProducts, category}) {
  return (
    <>
                  <Swiper
        slidesPerView={5}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
      {groupedProducts[category].map((product, index) => (
        <SwiperSlide key={index}><Custcard product={product}/></SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
