import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import MovieSwiper from "./MovieSwiper";

function Kids() {
  const { data } = useGlobalContext();

  const Kids = data.movies.filter((movie: Movie) => {
    const Kids = movie.type === "Kids";
    return Kids;
  });
  const sliceKids = Kids.slice(0, 10);
  return (
    <div className="popular_movies_con py-3">
      <h1>Kids</h1>
      <MovieSwiper movies={sliceKids} />
    </div>
  );
}

export default Kids;
