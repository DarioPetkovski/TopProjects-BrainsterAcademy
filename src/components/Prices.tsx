import Link from "next/link";
import React from "react";

function Prices() {
  return (
    <div className="container-fluid prices">
      <div className="row justify-content-center">
        <div className="col-3">
          <div className="card-price d-flex flex-column justify-content-center">
            <h4 className="header-price text-center py-3">Watch with ads</h4>
            <h5 className="text-center py-3 mb-0">Free</h5>
            <div className="card-content px-4 py-4">
              <small>Access to a Vast Libary</small>
              <br />
              <small>Unlimited Streaming</small>
              <br />
              <small>Multiple Devices</small>
              <br />
              <small>No Subscription Fee</small>
              <br />
            </div>
            <div className="d-flex flex-column px-4">
              <Link href="/login">
                <button className="mt-4 py-2 w-100 text-white">Register</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card-price d-flex flex-column justify-content-center position-relative">
            <h4 className="header-price-optimal position-absolute text-center pb-5 pt-2 ">
              Optimal choise
            </h4>
            <h4 className="header-price text-center py-3">Pay to watch</h4>
            <h5 className="text-center py-3 mb-0">499den./month</h5>
            <div className="card-content px-4 py-4">
              <small>Access to a Vast Libary</small>
              <br />
              <small>Unlimited Streaming</small>
              <br />
              <small>Multiple Devices</small>
              <br />
              <small>Watch without ads</small>
              <br />
              <small>Offline Viewing</small>
            </div>
            <div className="d-flex flex-column px-4">
              <Link href="/login">
                <button className="mt-4 py-2 w-100 text-white">Register</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card-price d-flex flex-column justify-content-center">
            <h4 className="header-price text-center py-3">
              Engage and receive points
            </h4>
            <h5 className="text-center py-3 mb-0">Watch with points</h5>
            <div className="card-content px-4 py-4">
              <small>Earn points when you engage</small>
              <br />
              <small>Claim rewards with earned points</small>
              <br />
              <small>No Subscription Fee</small>
              <br />
            </div>
            <div className="d-flex flex-column px-4">
              <Link href="/login">
                <button className="mt-4 py-2 w-100 text-white">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
