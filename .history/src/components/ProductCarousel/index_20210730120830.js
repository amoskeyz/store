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

  return (
    <div className="flex flex-row ">
      <style jsx>{`
        @media screen and (max-width: 1024px) {
          .kl-xxv {
            justify-content: center;
          }
        }
        .nm {
          width: 500px;
          height: 600px;
        }
        @media screen and (max-width: 1024px) {
          .nm {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
      <div className="w-full relactive prcd">
        <div className="relative shadowf flex flex-row kl-xxv">
          {/* <LightgalleryProvider> */}
          <div>

            {images.map((el, i) => (
              <div>

                <img
                  // style={{ width: "500px", height: "600px" }}
                  alt=""
                  className="object-cover w-full h-full nm"
                  src={`${el}?tr=w-520,h-750`}
                  onError={(e) =>
                    (e.target.src =
                      "https://ik.imagekit.io/62eig2lzls/no-content_-5NDR0bIN.png?tr=w-600,h-600")
                  } //`https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`
                />
              </div>
            ))}
          </div>

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
