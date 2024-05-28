import React from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import MovieSwiper from "./MovieSwiper";

function Podcasts() {
  const { data } = useGlobalContext();

  const podcasts = data.movies.filter((movie: Movie) => {
    const podcasts = movie.type === "Podcast";
    return podcasts;
  });
  const slicePodcasts = podcasts.slice(0, 10);
  return (
    <div className="popular_movies_con py-3">
      <h1>Podcasts</h1>
      <MovieSwiper movies={slicePodcasts} />
    </div>
  );
}

export default Podcasts;
