import React from "react";
import MovieSwiper from "./MovieSwiper";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";

function SearchMovies({ search }: { search: string }) {
  const { data } = useGlobalContext();
  const filterSearchedMovies = data.movies.filter((movie: Movie) => {
    if (
      movie.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    ) {
      return movie;
    }
  });
  return (
    <div className="popular_movies_con pt-3">
      <p
        className="pb-3 mb-0"
        style={{
          fontSize: "26px",
          color: "rgba(217, 217, 217, 1)",
          fontWeight: "100",
        }}
      >
        <i>Search Results</i>
      </p>
      {search && <MovieSwiper movies={filterSearchedMovies} />}
      <div className="searchMoviesBorder"></div>
    </div>
  );
}

export default SearchMovies;
