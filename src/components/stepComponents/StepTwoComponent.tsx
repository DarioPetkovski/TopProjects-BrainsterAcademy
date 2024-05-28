"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import SelectLabels from "../selectLabels";

function StepTwoComponent() {
  const pathName = usePathname();
  const router = useRouter();
  const { setUser, user } = useGlobalContext();
  const [interests, setInterests] = useState<boolean>(false);
  const handleBackClick = () => {
    if (pathName === "/register/step2") {
      router.push("/register/step1");
      setUser((prev: User) => ({
        ...prev,
        type: "",
      }));
    }
  };
  const handleNextClick = () => {
    if (pathName === "/register/step2") {
      if (user.interests.length !== 0) {
        router.push("/register/step3");
        setUser((prev: User) => ({
          ...prev,
          totorial: "",
        }));
        setInterests(false);
      } else {
        setInterests(true);
      }
    }
  };
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-3">
          <SelectLabels content={"Cinema"} type={"cinema"} padding={"px-4"} />
        </div>
        <div className="col-3">
          <SelectLabels
            content={"VisualArts"}
            type={"visualArts"}
            padding={"px-4"}
          />
        </div>
        <div className="col-3">
          <SelectLabels content={"Dance"} type={"dance"} padding={"px-4"} />
        </div>
        <div className="col-3">
          <SelectLabels content={"Teatre"} type={"teatre"} padding={"px-4"} />
        </div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-3">
          <SelectLabels content={"Music"} type={"music"} padding={"px-4"} />
        </div>
        <div className="col-3">
          <SelectLabels
            content={"Literature"}
            type={"literature"}
            padding={"px-4"}
          />
        </div>
        <div className="col-3">
          <SelectLabels
            content={"More Options"}
            type={"moreOptions"}
            padding={"px-2"}
          />
        </div>
      </div>
      {interests && <small className="text-danger">please select!</small>}
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

export default StepTwoComponent;
