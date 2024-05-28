import React from "react";
import { Movie } from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";

function SimilarMovies({ search }: { search: string }) {
  const { data, setModal, setMovieID } = useGlobalContext();
  const popularMovies = data.movies.slice(0, 10).filter((movie: Movie) => {
    const moviePopular = movie.popular === true;
    return moviePopular;
  });

  const filterSearchedMovies = data.movies.filter((movie: Movie) => {
    if (
      movie.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    ) {
      return movie;
    }
  });

  const similarMovies = data.movies.filter((movie: Movie) => {
    return filterSearchedMovies.some((filterMovie: Movie) => {
      return filterMovie.type === movie.type;
    });
  });
  return (
    <div className="popular_movies_con py-4">
      <p
        className="mb-0"
        style={{
          fontSize: "26px",
          color: "white",
          fontWeight: "500",
        }}
      >
        <i>Similar Results</i>
      </p>
      <div className="row">
        {search
          ? similarMovies.map((movie: Movie) => {
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
                    <img
                      className="filterMovie_element"
                      src={movie.img}
                      alt=""
                    />
                  </div>
                </div>
              );
            })
          : popularMovies.map((movie: Movie) => {
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
                    <img
                      className="filterMovie_element"
                      src={movie.img}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SimilarMovies;
