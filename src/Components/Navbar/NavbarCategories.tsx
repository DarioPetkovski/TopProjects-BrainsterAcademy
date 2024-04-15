import React from "react";
import { Link } from "react-router-dom";
import sneaker from "../../assets/icons/sneaker.svg";
import applicances from "../../assets/icons/oven.svg";
import games from "../../assets/icons/games.svg";
import clothes from "../../assets/icons/clothes.svg";
import kids from "../../assets/icons/roomkids.svg";
import camera from "../../assets/icons/camera.svg";
import sport from "../../assets/icons/sport.svg";

export default function NavbarCategories() {
  return (
    <ul className="nav-menu-wrapper w-25 list-unstyled pl-2">
      <li>
        <Link to={""} className="dropdown-item">
          <img src={sneaker} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Обувки</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={applicances} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Бела техника</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={games} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Игри и конзоли</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={clothes} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Облека</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={kids} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">За деца</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={camera} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Фотографија</p>
        </Link>
      </li>
      <li>
        <Link to={""} className="dropdown-item">
          <img src={sport} alt="sneaker" className="icon-size" />
          <p className="mt-3 small d-inline-block">Спорт</p>
        </Link>
      </li>
    </ul>
  );
}
