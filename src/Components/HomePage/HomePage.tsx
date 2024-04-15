import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import "./homepage.css";
import { ProductSection } from "./ProductSection/ProductSection";
import { Banner } from "./CommercialBanner/Banner";
import { Partners } from "./Partners/Partners";
import { Favorites } from "../Favorites/Favorites";
import sneaker from "../../assets/icons/sneaker.svg";
import applicances from "../../assets/icons/oven.svg";
import games from "../../assets/icons/games.svg";
import clothes from "../../assets/icons/clothes.svg";
import kids from "../../assets/icons/roomkids.svg";
import camera from "../../assets/icons/camera.svg";
import sport from "../../assets/icons/sport.svg";
import React from "react";
// import { Favorites } from "../Favorites/Favorites";

function HomePage() {
  return (
    <>
      <div className="container-fluid">
        {/* banner */}
        <div className="row">
          <div className="banner-bg position-relative">
            <div className="position-absolute w-50 banner-text">
              <h1 className="d-inline-block fw-bold banner-text-color display-2">
                D
              </h1>
              <h1 className="d-inline-block fw-bold display-2">atahub</h1>
              <h3 className="">Сите твои потреби на едно место</h3>
            </div>
            {/* video here */}
            <div className="position-absolute d-none d-md-block homepage-position-wrapper">
              <video
                autoPlay
                muted
                loop
                src={require("../../assets/videos/video.webm")}
              ></video>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* icons */}
        <div className="row">
          <div className="d-flex  justify-content-between">
            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={sneaker} alt="" />
              <p className="text-dark">Обувки</p>
            </Link>
            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={applicances} alt="" />
              <p className="text-dark">Бела техника</p>
            </Link>
            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={games} alt="" />
              <p className="text-dark">Игри и конзоли</p>
            </Link>
            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={clothes} alt="" />
              <p className="text-dark">Облека</p>
            </Link>

            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={kids} alt="" />
              <p className="text-dark">За деца</p>
            </Link>

            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={camera} alt="" />
              <p className="text-dark">Фотографија</p>
            </Link>
            <Link
              className="col-6 col-md-6 col-lg-1 text-decoration-none text-center"
              to="/productlisting"
            >
              <img src={sport} alt="" />
              <p className="text-dark">Спорт</p>
            </Link>
            {/* Add similar Link elements for other categories */}
          </div>
        </div>
      </div>
      <div className="first-section rounded-5">
        <div className="container">
          {/* first section */}
          <ProductSection title={"Популарни производи"} />
          {/* second section */}
          <ProductSection title={"Распродажба"} />
        </div>
      </div>
      <div className="container-fluid">
        {/* comercialbaner */}
        <Banner
          title={"Новиот Lenovo лаптоп ги руши сите рекорди"}
          image={"firstGDN"}
        />
      </div>
      <div className="first-section rounded-5">
        <div className="container">
          {/* third section */}
          <ProductSection title={"Последно посетени производи"} />
          {/* fourth section */}
          <ProductSection title={"Најдобри зделки на денот"} />
        </div>
      </div>
      <div className="container-fluid">
        {/* comercialbaner */}
        <Banner
          title={"Паметни телефони за паметни луѓе"}
          image={"secondGDN"}
        />
      </div>
      <div className="container-fluid first-section rounded-5">
        {/* partners */}
        <Partners />
      </div>
      {/* <Favorites /> */}
    </>
  );
}

export default HomePage;
