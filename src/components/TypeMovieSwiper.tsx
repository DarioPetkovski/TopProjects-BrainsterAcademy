import { Movie } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import React from "react";
import MovieSwiper from "./MovieSwiper";

function TypeMovieSwiper({ gener }: { gener: string }) {
  const { data } = useGlobalContext();

  const findMovies = data.movies.filter((movie: Movie) => movie.type === gener);
  return (
    <div className="popular_movies_con pt-3">
      <h1 className="pb-3">{gener}</h1>
      <MovieSwiper movies={findMovies} />
    </div>
  );
}

export default TypeMovieSwiper;
