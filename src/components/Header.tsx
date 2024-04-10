"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const navigation = usePathname();
  return (
    <>
      {/* <!-- Topbar Start --> */}
      <div className="container-fluid bg-dark p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-3">
              <a className="text-body px-2" href="tel:+0123456789">
                <i className="fa fa-phone-alt text-primary me-2"></i>+012 345
                6789
              </a>
              <a className="text-body px-2" href="mailto:info@example.com">
                <i className="fa fa-envelope-open text-primary me-2"></i>
                info@example.com
              </a>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center">
              <a className="btn btn-sm-square btn-outline-body me-1" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-sm-square btn-outline-body me-1" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-sm-square btn-outline-body me-1" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-sm-square btn-outline-body me-0" href="">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5">
        <Link className="navbar-brand ms-4 ms-lg-0" href="/">
          <h1 className="text-primary m-0">
            <img className="me-3" src="/images/icons/icon-1.png" alt="Icon" />
            Arkitektur
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link
              href="/"
              className={`nav-item nav-link ${
                navigation === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`nav-item nav-link ${
                navigation === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`nav-item nav-link ${
                navigation === "/services" ? "active" : ""
              }`}
            >
              Services
            </Link>
          </div>
          <a href="#" className="btn btn-primary py-2 px-4 d-none d-lg-block">
            Appointment
          </a>
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default Header;
