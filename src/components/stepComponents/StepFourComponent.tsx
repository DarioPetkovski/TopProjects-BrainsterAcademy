"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function StepFourComponent() {
  const pathName = usePathname();
  const router = useRouter();
  const { setUser, user } = useGlobalContext();
  const [subscription, setSubscription] = useState<boolean>(false);
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBackClick = () => {
    if (pathName === "/register/step4") {
      router.push("/register/step3");
      setUser((prev: User) => ({
        ...prev,
        totorial: "",
      }));
    }
  };
  const handleNextClick = () => {
    if (pathName === "/register/step4") {
      if (user.subscribtion !== "") {
        router.push("/register/step5");
        setSubscription(false);
      } else {
        setSubscription(true);
      }
    }
  };
  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <div className="card-price d-flex flex-column justify-content-center pb-5 w-100">
                <h6 className="header-price text-center py-3">
                  Watch with ads
                </h6>
                <h6 className="text-center sub-type py-2 mb-0">Free</h6>
                <div className="card-content px-4 py-2">
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
                  <label
                    onChange={(e: any) => {
                      onChangeHandle(e);
                      router.push("/register/step5");
                    }}
                    htmlFor="free"
                    className="mt-4 py-2 label-btn"
                  >
                    Register
                    <input
                      className="d-none"
                      type="radio"
                      id="free"
                      name="subscribtion"
                      value={"free"}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card-price d-flex flex-column justify-content-center pb-5 position-relative">
                <h6 className="header-optimal-price-step position-absolute text-center pb-5 pt-2 ">
                  Optimal choise
                </h6>
                <h6 className="header-price text-center py-3">Pay to watch</h6>
                <h6 className="text-center sub-type py-2 mb-0">
                  499den./month
                </h6>
                <div className="card-content px-4 py-2">
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
                  <label
                    onChange={(e: any) => {
                      onChangeHandle(e);
                      router.push("/register/step5");
                    }}
                    htmlFor="pay"
                    className="mt-4 py-2 label-btn"
                  >
                    Register
                    <input
                      className="d-none"
                      type="radio"
                      id="pay"
                      name="subscribtion"
                      value={"499den/month"}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card-price d-flex flex-column justify-content-center pb-5">
                <h6 className="header-price text-center py-3">
                  Engage and receive points
                </h6>
                <h6 className="text-center sub-type py-2 mb-0">
                  Watch with points
                </h6>
                <div className="card-content px-4 py-2">
                  <small>Earn points when you engage</small>
                  <br />
                  <small>Claim rewards with earned points</small>
                  <br />
                  <small>No Subscription Fee</small>
                  <br />
                </div>
                <div className="d-flex flex-column px-4">
                  <label
                    onChange={(e: any) => {
                      onChangeHandle(e);
                      router.push("/register/step5");
                    }}
                    htmlFor="points"
                    className="mt-4 py-2 label-btn"
                  >
                    Register
                    <input
                      className="d-none"
                      type="radio"
                      id="points"
                      name="subscribtion"
                      value={"points"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {subscription && (
        <div className="text-center">
          <small className="text-danger">
            please pick one of the subcriptions!
          </small>
        </div>
      )}
      <div className="container d-flex justify-content-center mt-1">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="btn-wrapper text-center">
              <button
                className={`signin-btn ${
                  pathName === "/register/step4" ? "" : "mt-5"
                } d-flex align-items-center justify-content-between`}
                type="button"
                onClick={handleBackClick}
              >
                <img
                  className="l-a"
                  src="/assets/images/leftArrow.png"
                  alt=""
                />
                Back
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="btn-wrapper text-center">
              <button
                className={`signin-btn ${
                  pathName === "/register/step4" ? "" : "mt-5"
                } d-flex align-items-center justify-content-between`}
                onClick={handleNextClick}
                type="button"
              >
                Next
                <img
                  className="r-a"
                  src="/assets/images/rightArrow.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepFourComponent;
