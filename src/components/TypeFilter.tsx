import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";

function TypeFilter({ type }: { type: string }) {
  const { data, setModal, setMovieID } = useGlobalContext();

  const findMovies = data.movies.filter((movie: Movie) => movie.type === type);
  return (
    <div className="popular_movies_con py-4">
      <h1 className="mb-0">{type}</h1>
      <div className="row">
        {findMovies.map((movie: Movie) => {
          return (
            <div
              key={`filter - ${movie.id}`}
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

export default TypeFilter;
