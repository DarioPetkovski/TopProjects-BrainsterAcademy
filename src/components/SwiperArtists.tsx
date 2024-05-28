import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGlobalContext } from "../context/Context";
import Link from "next/link";

function SwiperArtists() {
  const { data } = useGlobalContext();
  return (
    <div className="container-fluid d-flex flex-column text-center text-white artists">
      <h1 className="pt-3">MEET THE ARTISTS</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={false}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        className="swiper_container"
      >
        {data.artists.map((item) => {
          return (
            <SwiperSlide className="swiper_slide" key={item.id}>
              <Link href="/login" className="link-icon">
                <div className="swiper_el">
                  <h2>{item.name}</h2>
                  <img src={item.img} alt="" />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SwiperArtists;
