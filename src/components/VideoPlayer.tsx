"use client";
import { useGlobalContext } from "@/src/context/Context";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { Movie, User, movieComment } from "@/src/Interfaces/Interfaces";
import axios from "axios";

function VideoPlayer({ id }: { id: string }) {
  const { data, setModal, user } = useGlobalContext();
  const videoRef = useRef<any>(null);
  const player = useRef<any>();
  const [play, setPlay] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [chat, setChat] = useState<boolean>(false);
  const [movieComments, setMovieComments] = useState<movieComment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const watchMovie = data.movies.find((movie) => movie.id === id);
  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );
  useEffect(() => {
    if (data?.users.length !== 0) {
      setUsers(data?.users);
    }
  }, [users]);
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:5001/movies/${id}`);
      setMovie(response.data);
      setMovieComments(response.data.comments || []);
    };

    fetchComments();
  }, [user]);
  function generateRandomHash(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let hash = "";
    for (let i = 0; i < length; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  }
  const [movieComment, setMovieComment] = useState<string>("");
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    const newComment = {
      id: `${generateRandomHash(10)}`,
      userID: loggedUser?.id,
      text: movieComment,
      time: currentTime,
    };
    setMovieComments((prev) => [...prev, newComment]);
    setMovie((prev: Movie) => {
      const updatedMovie = {
        ...prev,
        comments: [...prev.comments, newComment],
      };
      axios.put(`http://localhost:5001/movies/${id}`, updatedMovie);
      return updatedMovie;
    });
    setMovieComment("");
  };

  useEffect(() => {
    if (watchMovie && watchMovie?.comments) {
      setMovie(watchMovie);
      setMovieComments(watchMovie.comments);
    }
  }, [watchMovie, watchMovie?.comments]);
  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration);
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    let hideTimer: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);

      if (hideTimer) clearTimeout(hideTimer);

      hideTimer = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration);
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("mousemove", handleMouseMove);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("mousemove", handleMouseMove);

        if (hideTimer) clearTimeout(hideTimer);
      };
    }
  }, []);
  const handleForwardClick = () => {
    const newTime = Math.min(currentTime + 10, totalDuration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleBackwardClick = () => {
    const newTime = Math.min(currentTime - 10, totalDuration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div ref={player} className="player-con">
      {showControls && (
        <img
          onClick={() => {
            setModal(false), window.history.back();
          }}
          className="backarrow position-absolute"
          src="/assets/images/backArrow.png"
          alt=""
        />
      )}
      {showControls && (
        <img
          className="info position-absolute"
          src="/assets/images/infoIcon.png"
          alt=""
        />
      )}
      <video
        onClick={() => {
          setPlay((prev) => !prev),
            play ? videoRef.current.play() : videoRef.current.pause();
        }}
        onDoubleClick={() => {
          setFullScreen((prev) => !prev);
          if (!fullScreen) {
            player?.current?.requestFullscreen();
          } else {
            document?.exitFullscreen();
          }
        }}
        ref={videoRef}
        className="w-100 videoPlayer"
        src={watchMovie?.video}
        muted={mute ? false : true}
        autoPlay
      ></video>
      {showControls && (
        <>
          <input
            className="range-field"
            type="range"
            min={0}
            max={totalDuration}
            value={currentTime}
            onChange={handleRangeChange}
          />
          <div className="position-absolute w-100 video_controls d-flex align-items-center px-5">
            <p className="text-white movie-time mb-0 position-absolute">
              {formatTime(currentTime)}/{formatTime(totalDuration)}
            </p>
            <div className="middle-controls d-flex position-absolute align-items-center">
              <img
                onClick={handleBackwardClick}
                src="/assets/images/backwardsIcon.png"
                alt=""
              />
              {play ? (
                <img
                  onClick={() => {
                    videoRef.current.play(), setPlay(false);
                  }}
                  src="/assets/images/playBtn.png"
                  alt=""
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    videoRef.current.pause(), setPlay(true);
                  }}
                  className="pointer text-white"
                  icon={faPause}
                  style={{ fontSize: "50px", padding: "0 5px 0 5px" }}
                />
              )}

              <img
                onClick={handleForwardClick}
                src="/assets/images/forwardsIcon.png"
                alt=""
              />
            </div>
            <div className="right-controls position-absolute d-flex align-items-center">
              <img src="/assets/images/MovieSettings.png" alt="" />
              <img src="/assets/images/subtitles.png" alt="" />
              <FontAwesomeIcon
                className="text-white px-2 pointer"
                onClick={() => setMute((prev) => !prev)}
                style={{ fontSize: "40px" }}
                icon={mute ? faVolumeUp : faVolumeMute}
              />
              <img
                onClick={() => setChat((prev) => !prev)}
                src={`/assets/images/${
                  chat ? "movieChatRed.png" : "videoChat.png"
                }`}
                alt=""
              />
            </div>
          </div>
        </>
      )}
      {chat && (
        <div className="position-absolute comments_wrapper">
          {movieComments?.slice(-5).map((comment: any) => {
            if (
              comment.time <= currentTime + 3 &&
              comment.time >= currentTime - 3
            ) {
              return (
                <div
                  key={comment.id}
                  className="comments_container align-items-start d-flex flex-column"
                >
                  {users.map((user, i) => {
                    if (user.id === comment.userID) {
                      return (
                        <div
                          key={`commentt - ${comment.id}`}
                          className="com-box px-4 w-100 mt-1 py-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              style={{ width: "30px", borderRadius: "50%" }}
                              src={user?.img}
                              alt=""
                            />
                            <p key={`comment - ${i}`} className="mb-0 px-2">
                              {user?.userName}:
                            </p>
                          </div>
                          <p className="mb-0">{comment?.text}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            } else {
              return null;
            }
          })}
          <form
            className="add_Comment mt-1 d-flex align-items-center"
            onSubmit={onSubmitHandle}
          >
            <input
              onChange={(e: any) => setMovieComment(e.target.value)}
              value={movieComment}
              className="text-black px-2 py-1"
              type="text"
              placeholder="Leave a Comment"
              maxLength={50}
            />
            <button type="submit" className="px-2">
              <img src="/assets/images/crossAdd.png" alt="" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
