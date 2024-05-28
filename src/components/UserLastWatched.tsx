import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Movie } from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";

function UserLastWatched({ movies }: { movies: Movie[] }) {
  const { setModal, setMovieID } = useGlobalContext();
  return (
    <div className="userMovies">
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
        className="swiper_user_movies_con py-3"
      >
        {movies
          .slice(-10)
          .reverse()
          .map((movie: Movie, index: number) => {
            return (
              <SwiperSlide key={`pop-${index}`} className="swiper_user_movies">
                <div
                  onClick={() => {
                    setModal(true), setMovieID(movie.id);
                  }}
                  className="swiper_el_user_movies pointer"
                >
                  <img src={movie?.img} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default UserLastWatched;
