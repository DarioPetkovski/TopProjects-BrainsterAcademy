import React from "react";
import Room from "./Room";
import { useGlobalContext } from "../context/Context";

function RoomSection() {
  const { data } = useGlobalContext();
  const movies = data.movies
    .filter((movie) => movie.type === "Movies")
    .slice(0, 5);
  const kids = data.movies.filter((movie) => movie.type === "Kids").slice(0, 5);
  const documentaries = data.movies
    .filter((movie) => movie.type === "Documentaries")
    .slice(0, 5);
  const podcasts = data.movies
    .filter((movie) => movie.type === "Podcast")
    .slice(0, 5);
  const TVSeries = data.movies
    .filter((movie) => movie.type === "TV Series")
    .slice(0, 5);
  return (
    <div className="container-fluid room-con">
      <div className="row first-row">
        <Room movies={movies} title="Movie Room" />
        <Room movies={kids} title="Kids Room" />
        <Room movies={documentaries} title="Doc. Room" />
      </div>
      <div className="row second-row justify-content-center">
        <Room movies={podcasts} title="Podcasts" />
        <Room movies={TVSeries} title="TV Series" />
      </div>
    </div>
  );
}

export default RoomSection;
