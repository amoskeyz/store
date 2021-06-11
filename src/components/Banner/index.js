// import logo from 'assets/logo.png';
import React from 'react';
import Picture from 'components/Picture';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.scss';
import './style.scss';

SwiperCore.use([EffectFade, Navigation, Autoplay]);

const Banner = () => {
  const data = [
    {
      lg: 'https://via.placeholder.com/1256x502',
      md: 'https://via.placeholder.com/1024x576',
      sm: 'https://via.placeholder.com/628x700',
    },
    {
      lg: 'https://via.placeholder.com/1256x502/655655',
      md: 'https://via.placeholder.com/1024x576/655655',
      sm: 'https://via.placeholder.com/628x700/655655',
    },
    {
      lg: 'https://via.placeholder.com/1256x502/000000',
      md: 'https://via.placeholder.com/1024x576/000000',
      sm: 'https://via.placeholder.com/628x700/000000',
    },
  ];

  return (
    <>
      <section className="tp-banner mt-20 xl:container mx-auto relative h-auto overflow-hidden mb-24">
        <Swiper
          effect="fade"
          autoplay={{ delay: 5000 }}
          navigation
          loop
          speed={1000}
        >
          {data.map((d, i) => (
            <SwiperSlide key={i}>
              <Picture
                small={d.sm}
                medium={d.md}
                large={d.lg}
                className="w-full h-full object-cover"
                alt={''}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Banner;
