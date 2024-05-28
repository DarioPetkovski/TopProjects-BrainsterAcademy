import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import MovieSwiper from "./MovieSwiper";

function OurRecommandation() {
  const { data } = useGlobalContext();

  const recommandedMovies = data.movies.slice(20, 30).filter((movie: Movie) => {
    const movieRecommanded = movie.ourRecommendation === true;
    return movieRecommanded;
  });
  return (
    <div className="popular_movies_con py-3">
      <h1>Our Recommendation</h1>
      <MovieSwiper movies={recommandedMovies} />
    </div>
  );
}

export default OurRecommandation;
