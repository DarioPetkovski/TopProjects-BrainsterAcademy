"use client";
import React, { useState } from "react";
import SelectLabels from "../selectLabels";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/src/context/Context";
import { useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

function StepSixComponent() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  const [cultures, setCultures] = useState<boolean>(false);
  const handleNextClick = () => {
    if (pathName === "/register/step6") {
      if (user.cultures.length !== 0) {
        router.push("/register/step7");
        setUser((prev: User) => ({
          ...prev,
          fav_categories: [],
        }));
        setCultures(false);
      } else {
        setCultures(true);
      }
    }
  };
  const handleBackClick = () => {
    router.push("/register/step5");
  };
  return (
    <div className="container text-center">
      <div className="container d-flex justify-content-between">
        <div>
          <SelectLabels
            content={"Macedonian"}
            type={"macedonian"}
            padding={"px-3"}
          />
        </div>
        <div>
          <SelectLabels content={"Balkan"} type={"balkan"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels
            content={"European"}
            type={"european"}
            padding={"px-3"}
          />
        </div>
        <div>
          <SelectLabels
            content={"Mediteranien"}
            type={"mediterian"}
            padding={"px-3"}
          />
        </div>
        <div>
          <SelectLabels content={"Global"} type={"global"} padding={"px-3"} />
        </div>
      </div>
      {cultures && <small className="text-danger">please select!</small>}
      <div className="container">
        <div className="container d-flex justify-content-center mt-5">
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="btn-wrapper text-center">
                <button
                  onClick={handleBackClick}
                  className={`signin-btn "mt-5"
             d-flex align-items-center justify-content-between`}
                  type="button"
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
                  onClick={handleNextClick}
                  className={`signin-btn "mt-5" d-flex align-items-center justify-content-between`}
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
    </div>
  );
}

export default StepSixComponent;
