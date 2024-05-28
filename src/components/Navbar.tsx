import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const onClickHandleSlide = () => {
    setSlideShow((prev: boolean) => !prev);
  };

  return (
    <>
      <nav className="d-flex position-fixed justify-content-between h-100 flex-column homePage_nav py-4">
        <Link className="link" href={"/accountPage"}>
          <div className="first-block d-flex flex-column justify-content-center align-items-center">
            <img src="/assets/images/userIcon.png" alt="" />
            <p className="text-white mb-0">Profile</p>
          </div>
        </Link>
        <div className="second-block">
          <Link className="link" href={"/homepage"}>
            <div className="house-con d-flex flex-column justify-content-center align-items-center">
              <img src="/assets/images/house.png" alt="" />
              <p className="text-white mb-0">Home</p>
            </div>
          </Link>

          <div
            onClick={onClickHandleSlide}
            className="rooms-con d-flex flex-column justify-content-center align-items-center"
          >
            <img src="/assets/images/cubeIcon.png" alt="" />
            <p className="text-white mb-0 pt-2">Rooms</p>
          </div>

          <Link className="link" href={"/comunityPage"}>
            <div className="chat-con d-flex flex-column justify-content-center align-items-center">
              <img src="/assets/images/commentIcon.png" alt="" />
              <p className="text-white mb-0">Chat</p>
            </div>
          </Link>

          <div className="movie-con d-flex flex-column justify-content-center align-items-center">
            <img src="/assets/images/videoICon.png" alt="" />
            <p className="text-white mb-0">Movie Hall</p>
          </div>
        </div>
        <div className="third-block d-flex flex-column justify-content-center align-items-center">
          <img src="/assets/images/Settings.png" alt="" />
          <p className="text-white mb-0">Settings</p>
        </div>
      </nav>
      <div
        className="position-fixed nav-con h-100"
        style={{ left: `${slideShow ? "8%" : "-100%"}` }}
      >
        <div className="sideShow_icons bg-white d-flex justify-content-between py-1 px-5 position-absolute align-items-center">
          <Link className="link" href={"/movies"}>
            <div className="slideShow_con d-flex flex-column justify-contnet-center align-items-center">
              <img
                className="pt-3"
                src="/assets/images/movieTrack.png"
                alt=""
              />
              <p className="mb-0 text-black">Movies</p>
            </div>
          </Link>
          <Link className="link" href={"/tvseries"}>
            <div className="slideShow_con d-flex flex-column justify-contnet-center align-items-center">
              <img className="pt-3" src="/assets/images/TV.png" alt="" />
              <p className="mb-0 text-black">TV Series</p>
            </div>
          </Link>
          <Link className="link" href={"/podcasts"}>
            <div className="slideShow_con d-flex flex-column justify-contnet-center align-items-center">
              <img className="pt-3" src="/assets/images/mic.png" alt="" />
              <p className="mb-0 text-black">Podcasts</p>
            </div>
          </Link>
          <Link className="link" href={"/kids"}>
            <div className="slideShow_con d-flex flex-column justify-contnet-center align-items-center">
              <img className="pt-3" src="/assets/images/smile.png" alt="" />
              <p className="mb-0 text-black">Kids</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
