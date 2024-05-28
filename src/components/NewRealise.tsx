import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import MovieSwiper from "./MovieSwiper";

function PopularMovies() {
  const { data } = useGlobalContext();

  const newRealiseMovies = data.movies.slice(10, 20).filter((movie: Movie) => {
    const movieNewRealise = movie.newReleases === false;
    return movieNewRealise;
  });
  return (
    <div className="popular_movies_con py-3">
      <h1>New Realise</h1>
      <MovieSwiper movies={newRealiseMovies} />
    </div>
  );
}

export default PopularMovies;
