"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import UserTypeLabels from "../userTypeLabels";

function StepOneComponent() {
  const pathName = usePathname();
  const [activeUserType, setActiveUserType] = useState<string>("");
  const router = useRouter();
  const { setUser, user } = useGlobalContext();
  const [type, setType] = useState(false);
  const handleNextClick = () => {
    if (pathName === "/register/step1") {
      if (user.type !== "") {
        router.push("/register/step2");
        setUser((prev: User) => ({
          ...prev,
          interests: [],
        }));
        setType(false);
      } else {
        setType(true);
      }
    }
  };
  const handleBackClick = () => {
    router.push("/register");
  };
  return (
    <div className="container w-75 text-center">
      <div className="d-flex justify-content-between align-items-between">
        <UserTypeLabels
          content={"Sign up as Artist"}
          type={"artist"}
          isActive={activeUserType === "artist"}
          setActiveUserType={setActiveUserType}
        />
        <UserTypeLabels
          content={"Sign up as Viewer"}
          type={"viewer"}
          isActive={activeUserType === "viewer"}
          setActiveUserType={setActiveUserType}
        />
      </div>
      {type && <small className="text-danger">please select!</small>}
      <div className="container d-flex justify-content-center mt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="btn-wrapper text-center">
              <button
                className={`signin-btn "mt-5"
             d-flex align-items-center justify-content-between`}
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
                className={`signin-btn "mt-5" d-flex align-items-center justify-content-between`}
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

export default StepOneComponent;
