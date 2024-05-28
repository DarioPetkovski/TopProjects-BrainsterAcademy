import React from "react";
import { Movie } from "../Interfaces/Interfaces";
import Link from "next/link";

function Room({ movies, title }: { movies: Movie[]; title: string }) {
  return (
    <div className="col-4">
      <Link className="link-icon" href="/login">
        <h2 className="text-center">{title}</h2>
        <div className="row position-relative">
          {movies.map((movie, index) => {
            return (
              <div
                key={movie.id}
                className={`col-4 position-absolute room-img-${index + 1}`}
              >
                <img className="room-img" src={movie.img} alt="" />
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
}

export default Room;
