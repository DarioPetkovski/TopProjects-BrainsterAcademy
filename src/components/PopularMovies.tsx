import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import MovieSwiper from "./MovieSwiper";

function PopularMovies() {
  const { data } = useGlobalContext();

  const popularMovies = data.movies.slice(0, 10).filter((movie: Movie) => {
    const moviePopular = movie.popular === true;
    return moviePopular;
  });
  return (
    <div className="popular_movies_con pt-3">
      <h1>Popular</h1>
      <MovieSwiper movies={popularMovies} />
    </div>
  );
}

export default PopularMovies;
