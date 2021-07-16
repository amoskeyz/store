import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Navigation,
  Autoplay,
  Pagination,
  Thumbs,
} from "swiper";
// import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import "swiper/swiper-bundle.css";
import "swiper/components/effect-fade/effect-fade.scss";
import img from "assets/bg-img.png";
import op from "assets/svg/product-one.svg";

SwiperCore.use([EffectFade, Navigation, Autoplay, Pagination, Thumbs]);

const index = ({ images, showThumbs = false, effect = "slide" }) => {
  const [thumbSwiper, setThumbSwiper] = useState(null);

  console.log(images, "=------");

  return (
    <div className="flex flex-row">
      <div className="w-full relactive prcd">
        <div className="relative shadowf flex flex-row">
          {/* <LightgalleryProvider> */}
          <div>
            {/* <Swiper
          // effect={effect}
          // navigation
          // loop
          // pagination={{ clickable: true }}
          // id="main"
          // thumbs={{ swiper: thumbSwiper }}
        //> */}
            {images.map((el, i) => (
              <div>
                {/* // <SwiperSlide className="relative" key={`carousel_el_${3}`}> */}
                {console.log(el, "el///")}
                <img
                  style={{ width: "500px", height: "600px" }}
                  alt=""
                  className="object-cover w-full h-full"
                  src={`${el}?tr=w-520,h-750`}
                  onError={(e) =>
                    (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
                  }
                />
              </div>
            ))}
          </div>
          {/* </Swiper> */}
          {/* </LightgalleryProvider> */}
          {showThumbs && (
            <div className="mt-0 ml-4">
              <div>
                {/* <Swiper
            // effect="slide"
            // id="thumbs"
            // onSwiper={setThumbSwiper}
            // spaceBetween={5}
            // slidesPerView={5}
          > */}
                {/* {images.map((el) => (
                  <div>
                    <SwiperSlide key={`carousel_el_${el}_sub`}>
                    <div className="h-auto w-full relative shadow">
                      <img
                        alt=""
                        style={{ width: "130px", height: "190px" }}
                        className="object-cover w-full h-full"
                        src={`${el}`} //{`https://ik.imagekit.io/gk81krdud/${el}?tr=w-300,h-400`}
                        onError={(e) =>
                          (e.target.src = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`)
                        }
                      />
                    </div>
                  </div>
                   </SwiperSlide>
                ))} */}
              </div>
              {/* </Swiper> */}
            </div>
          )}
        </div>

        {/* {showThumbs && (
        <div className="mt-5">
          <Swiper
            effect="slide"
            id="thumbs"
            onSwiper={setThumbSwiper}
            spaceBetween={5}
            slidesPerView={5}
          >
            {images.map((el) => (
              <SwiperSlide key={`carousel_el_${el}_sub`}>
                <div className="h-auto w-full relative shadow">
                  <img
                    alt=""
                    className="object-cover w-full h-full"
                    src={`${el}?tr=w-300,h-400`}//{`https://ik.imagekit.io/gk81krdud/${el}?tr=w-300,h-400`}
                    onError={(e) => {
                      e.target = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )} */}
      </div>
      {/* {false && (
        <div className="mt-5">
          <Swiper
            effect="slide"
            id="thumbs"
            onSwiper={setThumbSwiper}
            spaceBetween={5}
            slidesPerView={5}
          >
            {images.map((el) => (
              <SwiperSlide key={`carousel_el_${el}_sub`}>
                <div className="h-auto w-full relative shadow">
                  <img
                    alt=""
                    className="object-cover w-full h-full"
                    src={`https://ik.imagekit.io/gk81krdud/${el}?tr=w-300,h-400`}
                    onError={(e) => {
                      e.target = `https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )} */}
    </div>
  );
};

export default index;
