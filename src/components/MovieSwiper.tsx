"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";
import { usePathname } from "next/navigation";

function MovieSwiper({ movies }: { movies: Movie[] }) {
  const pathName = usePathname();
  const { setModal, setMovieID } = useGlobalContext();
  return (
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
      className="swiper_pop_movies_con py-3"
    >
      {movies.slice(0, 10).map((movie: Movie, index: number) => {
        return (
          <SwiperSlide key={`pop-${index}`} className="swiper_pop_movies">
            <div
              onClick={() => {
                setModal(true), setMovieID(movie.id);
              }}
              className="swiper_el_pop_movies pointer"
            >
              <img src={movie.img} alt="" />
              {pathName === "/search" && (
                <p style={{ fontWeight: "300" }} className="mt-3">
                  <i>{movie.title}</i>
                </p>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default MovieSwiper;
