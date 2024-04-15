import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

import NavbarItem from "./NavbarItem";
import "./Navbar.css";
import NavbarCategories from "./NavbarCategories";

export default function Navbar() {
  const { data, toggleLoginModal, isLogin } = useGlobalContext();
  const location = useLocation();
  const { pathname } = location;
  const isHome = pathname === "/";
  // console.log(data.data);

  const handleLoginModal = () => {
    toggleLoginModal();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-border-color">
        <div className="container-fluid">
          <div className="w-100 d-flex justify-content-between nav-mobile align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <img
              src={require(`../../assets/images/DataHub-logo.png`)}
              alt=""
              width="89"
              height="17"
            />
            <img
              src={require(`../../assets/icons/search-icon.png`)}
              alt=""
              width="16"
              height="16"
            />
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-desktop">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  <img
                    src={require("../../assets/images/logo.png")}
                    alt="logo"
                    className="logo-img"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={""}
                  className="nav-link dropdown-toggle py-3"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Сите категории
                </Link>

                <ul className="dropdown-menu w-100">
                  <div className="dropdown-wrapper d-flex">
                    <NavbarCategories />
                    <div className="w-75 p-2">
                      <div>
                        <h2>
                          <strong>Бела техника</strong>
                        </h2>
                        <div className="row p-3">
                          {data?.slice(0, 16).map((card) => (
                            <div key={card.id} className="col-3 mb-3 g-2">
                              <NavbarItem {...card} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  to={"/catalog"}
                  className="nav-link py-3"
                  aria-disabled="true"
                >
                  Каталози
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/bestdeals"}
                  className="nav-link py-3"
                  aria-disabled="true"
                >
                  Најдобри зделки
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="nav-link py-3"
                  aria-disabled="true"
                >
                  За нас
                </Link>
              </li>
            </ul>

            {isHome && (
              <div className="nav-mobile">
                <form className="d-flex p-2" role="search">
                  <input
                    className="form-control me-2 nav-border-color rounded-pill w-100 border-warning"
                    type="search"
                    placeholder="Пребарај"
                    aria-label="Search"
                  />
                </form>
              </div>
            )}
            {!isLogin ? (
              <button
                onClick={handleLoginModal}
                className="btn btn-outline-dark rounded-pill ml-4"
                type="submit"
              >
                Најавете се
              </button>
            ) : (
              <Link
                to="/profile"
                className="btn btn-outline-dark text-decoration-none text-dark rounded-pill ml-4"
                type="submit"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
