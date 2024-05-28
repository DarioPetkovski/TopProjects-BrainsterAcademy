import { useState } from "react";
import { Movie } from "../Interfaces/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faHeart,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context/Context";
import Link from "next/link";
import ArtistsMovies from "./ArtistsMovies";

function MovieOverview({ movie }: { movie: Movie | undefined }) {
  const { setModal, data, modal } = useGlobalContext();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [mute, setMute] = useState<boolean>(false);
  const [showArtistModal, setShowArtistModal] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>("");
  const [follow, setFollow] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [copyURL, setCopyURL] = useState<boolean>(false);
  const [URL, setURL] = useState<string>("");
  const findArtist = data?.artists.find((artist) =>
    artist.name.includes(artistName)
  );
  const filterArtistMovies = data?.movies?.filter((movie) => {
    if (findArtist) {
      return movie.cast.includes(findArtist?.name);
    }
  });

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/watch/${movie?.id}`
      );
      setURL("Link copied!");
    } catch (err) {
      setURL("Failed to copy link");
    }
  };

  return (
    <>
      {!showArtistModal && (
        <div className="movieModal">
          <div className="container movieCon px-0">
            <img
              onClick={() => setModal(false)}
              className="position-fixed exitIcon"
              src="/assets/images/exit.png"
              alt=""
            />
            <div
              className="position-absolute innerBG d-flex flex-column justify-content-end"
              style={{ objectFit: "cover", width: "100%", height: "450px" }}
            >
              <div className="w-50 overview-content px-5">
                <h2>{movie?.title}</h2>
                <p>
                  {showFullDescription
                    ? movie?.description
                    : movie?.description.slice(0, 100)}
                  {movie?.description && movie?.description.length > 100 && (
                    <i
                      className="text-success pointer"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? " See less..." : " See more..."}
                    </i>
                  )}
                </p>
                <div className="controllers d-flex justify-content-between">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <Link className="link" href={`/watch/${movie?.id}`}>
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
                <div
                  onClick={() => setMute((prev) => !prev)}
                  className="position-absolute icon-mute text-white"
                >
                  <FontAwesomeIcon icon={mute ? faVolumeUp : faVolumeMute} />
                </div>
              </div>
            </div>
            <video
              src={movie?.trailer}
              autoPlay
              loop
              muted={mute ? false : true}
              style={{ objectFit: "cover", width: "100%", height: "440px" }}
            ></video>
            <div className="overView-data pt-4 pb-3 px-5">
              <div className="d-flex align-items-center">
                <h4 className="mb-0">{movie?.match} Match 2024</h4>
                <div className="px-3">
                  <span className="age-badge p-1">{movie?.age}</span>
                </div>
                <small>action, language</small>
              </div>
              <div className="row pt-3">
                <div className="col-4">
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <b>Geners:</b>
                        {movie?.genres.map((movie, i) => {
                          return (
                            <span key={i} className="text-grey">
                              {" "}
                              {movie},
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>Cast:</b>
                        {movie?.cast.map((actor, i) => {
                          return (
                            <span
                              onClick={() => {
                                setArtistName(actor), setShowArtistModal(true);
                              }}
                              key={i}
                              className="text-grey pointer"
                            >
                              {" "}
                              {actor},
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>Director:</b>
                        <span className="text-grey"> {movie?.director}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <b>Writters:</b>
                        {movie?.writers.map((movie, i) => {
                          return (
                            <span key={i} className="text-grey">
                              {" "}
                              {movie},
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>Producers:</b>
                        {movie?.producers.map((movie, i) => {
                          return (
                            <span key={i} className="text-grey">
                              {" "}
                              {movie},
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>Cinematography:</b>
                        <span className="text-grey">
                          {" "}
                          {movie?.cinematography}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <b>Editing:</b>
                        <span className="text-grey"> {movie?.editing}</span>
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>Costume Design:</b>
                        <span className="text-grey">
                          {" "}
                          {movie?.costumeDesign}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showArtistModal && (
        <>
          {modal && <MovieOverview movie={movie} />}
          <div className="movieModal">
            <div className="container artistCon px-5 py-4">
              <img
                onClick={() => setShowArtistModal(false)}
                className="position-fixed exitIcon"
                src="/assets/images/exit.png"
                alt=""
              />
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="artistOverviewImg"
                  style={{ width: "30%", height: "350px" }}
                >
                  <img className="w-100" src={findArtist?.img} alt="" />
                </div>
                <div
                  className="artistBio px-5 text-center"
                  style={{ width: "70%" }}
                >
                  <h1>{findArtist?.name}</h1>
                  <div>
                    <p>{findArtist?.about}</p>
                    <button className="signin-btn mt-4">See More</button>
                  </div>
                </div>
              </div>
              <div className="artistMovieCon pt-4">
                <p>Филмови</p>
                <ArtistsMovies
                  movies={filterArtistMovies}
                  setShowArtistModal={setShowArtistModal}
                />
                <ul className="px-0 pricesList">
                  {findArtist?.rewards.map((reward, i) => {
                    return <li key={`reward - ${i}`}>{reward}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieOverview;
