import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";

function FIlterByGener({ gener }: { gener: string }) {
  const { data, setModal, setMovieID } = useGlobalContext();

  const findMovies = data.movies.filter((movie: Movie) =>
    movie.genres.includes(gener)
  );
  return (
    <div className="popular_movies_con py-4">
      <h1 className="mb-0">{gener}</h1>
      <div className="row">
        {findMovies.map((movie: Movie) => {
          return (
            <div
              key={`gener - ${movie.id}`}
              className="col-3 mt-5 movieCard_zoom"
            >
              <div
                onClick={() => {
                  setModal(true), setMovieID(movie.id);
                }}
                className="swiper_el_pop_movies pointer"
              >
                <img className="filterMovie_element" src={movie.img} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FIlterByGener;
