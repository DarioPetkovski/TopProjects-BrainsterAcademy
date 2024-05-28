"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import UserTypeLabels from "../userTypeLabels";

function StepThreeComponent() {
  const pathName = usePathname();
  const router = useRouter();
  const { setUser, user } = useGlobalContext();
  const [activeUserType, setActiveUserType] = useState<string>("");
  const [tutorial, setTutorial] = useState<boolean>(false);
  const handleNextClick = () => {
    if (pathName === "/register/step3") {
      if (user.totorial !== "") {
        router.push("/register/step4");
        setTutorial(false);
      } else {
        setTutorial(true);
      }
    }
  };
  const handleBackClick = () => {
    if (pathName === "/register/step3") {
      router.push("/register/step2");
      setUser((prev: User) => ({
        ...prev,
        interests: [],
      }));
    }
  };
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-6 px-2">
          <UserTypeLabels
            content={"Show me around"}
            type={"totorial"}
            isActive={activeUserType === "totorial"}
            setActiveUserType={setActiveUserType}
          />
        </div>
        <div className="col-6 px-2">
          <UserTypeLabels
            content={"Dive right in and explore"}
            type={"diveIn"}
            isActive={activeUserType === "diveIn"}
            setActiveUserType={setActiveUserType}
          />
        </div>
      </div>
      {tutorial && <small className="text-danger">please select!</small>}
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

export default StepThreeComponent;
