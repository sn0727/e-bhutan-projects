import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation]);

const YourComponent = () => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    // Swiper initialization
    if (swiper === null) {
      setSwiper(new Swiper('.your-swiper-container', {
        // Swiper options
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // Add other options as needed
      }));
    }
  }, [swiper]);

  return (
    <div className="your-swiper-container">
      <Swiper
        onSwiper={setSwiper}
        navigation
      >
        <SwiperSlide>Your content here</SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default YourComponent;
