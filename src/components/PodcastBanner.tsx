import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import { Movie } from "../Interfaces/Interfaces";
import Navbar from "./Navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";

function PodcastsBanner() {
  const { data } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [follow, setFollow] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [copyURL, setCopyURL] = useState<boolean>(false);
  const [URL, setURL] = useState<string>("");

  const findFav_categories = data.movies.filter((movie: Movie) => {
    const podcasts = movie.type === "Podcast";
    return podcasts;
  });
  const categorySortByImdb = findFav_categories
    .slice(0, 5)
    .sort((a: Movie, b: Movie) => {
      return b.imdb - a.imdb;
    });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % categorySortByImdb.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [categorySortByImdb]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/watch/${categorySortByImdb[currentIndex]?.id}`
      );
      setURL("Link copied!");
    } catch (err) {
      setURL("Failed to copy link");
    }
  };

  return (
    <div className="homePage_Banner position-relative">
      <Navbar />

      <div>
        <h1 className="position-absolute text-white room-Header">
          Podcasts Room
        </h1>
      </div>
      <Link href={"/search"}>
        <img
          className="position-absolute search_glass"
          src="/assets/images/searchGlass.png"
          alt=""
        />
      </Link>

      <div className="position-absolute movie-content">
        <h1>{categorySortByImdb[currentIndex].title}</h1>
        <p>{categorySortByImdb[currentIndex].description}</p>
        <div className="controllers pt-5 d-flex justify-content-between">
          <div className="row align-items-center">
            <div className="col-6">
              <Link
                className="link"
                href={`/watch/${categorySortByImdb[currentIndex].id}`}
              >
                <button
                  className={`signin-btn pad "mt-5" d-flex align-items-center justify-content-between`}
                  type="button"
                >
                  <img
                    className="r-a"
                    src="/assets/images/playICon.png"
                    alt=""
                  />
                  Гледај
                </button>
              </Link>
            </div>

            <div className="col-2">
              {!follow && (
                <img
                  onClick={() => setFollow(true)}
                  className="pointer"
                  src="/assets/images/heartIcon.png"
                  alt=""
                />
              )}
              {follow && (
                <div
                  className="pointer"
                  onClick={() => setFollow(false)}
                  style={{ color: "red", fontSize: "25px" }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              )}
            </div>
            <div className="col-2">
              {!add && (
                <img
                  onClick={() => setAdd(true)}
                  className="pointer"
                  src="/assets/images/crossIcon.png"
                  alt=""
                />
              )}
              {add && (
                <div
                  className="pointer"
                  onClick={() => setAdd(false)}
                  style={{ color: "white", fontSize: "25px" }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>
            <div className="col-2">
              <img
                onClick={() => {
                  copyToClipboard(), setCopyURL((prev) => !prev);
                }}
                className="pointer"
                src="/assets/images/shareIcon.png"
                alt=""
              />
              {copyURL && (
                <small className="w-100 position-absolute">
                  movie URL coppied
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={`${categorySortByImdb[currentIndex].img}`}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default PodcastsBanner;
