import React from "react";

function Footer() {
  return (
    <div className="container-fluid py-4 footer">
      <div className="container px-5 d-flex justify-content-between align-items-center">
        <p className="footer-content mb-0">
          KINEMOE.MK&copy; <small>2024</small>
        </p>
        <div className="footer-logo">
          <img className="w-100" src="/assets/images/kinemoeLogo.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
