import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
function PopUpIcons() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="container-fluid icon-con">
      <div className="icons d-flex justify-content-around">
        <Link className="link-icon" href="/login">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <img className="icon" src="/assets/images/pc.png" alt="" />
            <h5 className="text-white mt-3">Streaming Platform</h5>
          </div>
        </Link>
        <Link href={"/login"} className="link-icon">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <img className="icon" src="/assets/images/people.png" alt="" />
            <h5 className="text-white mt-3">Community hub for artists</h5>
          </div>
        </Link>
        <Link className="link-icon" href="/login">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <img className="icon" src="/assets/images/healty.png" alt="" />
            <h5 className="text-white mt-3">Platform for sharing culture</h5>
          </div>
        </Link>
        <Link href="/login" className="link-icon">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <img className="icon" src="/assets/images/handshake.png" alt="" />
            <h5 className="text-white mt-3">Social business model</h5>
          </div>
        </Link>
        <Link href="/login" className="link-icon">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <img className="icon" src="/assets/images/target.png" alt="" />
            <h5 className="text-white mt-3">Supporting for emerging talent</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PopUpIcons;
