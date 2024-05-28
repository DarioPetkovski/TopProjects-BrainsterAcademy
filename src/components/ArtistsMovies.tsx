import React, { Dispatch, SetStateAction } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Movie } from "../Interfaces/Interfaces";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/Context";

function ArtistsMovies({
  movies,
  setShowArtistModal,
}: {
  movies: Movie[];
  setShowArtistModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { setModal, setMovieID } = useGlobalContext();
  const pathName = usePathname();
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
      className="swiper_artist_movie_con"
    >
      {movies.map((movie: Movie, index: number) => {
        return (
          <SwiperSlide key={`pop-${index}`} className="swiper_artist_movie">
            <div
              onClick={() => {
                setModal(true), setMovieID(movie.id), setShowArtistModal(false);
              }}
              className="swiper_el_artist_movie pointer"
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

export default ArtistsMovies;
