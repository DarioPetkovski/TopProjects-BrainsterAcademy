import React, { useState } from "react";
import SelectLabels from "../selectLabels";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

function StepSevenComponent() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  const [categories, setCategories] = useState<boolean>(false);
  const handleNextClick = () => {
    if (pathName === "/register/step7") {
      if (user.fav_categories.length !== 0) {
        router.push("/register/step8");
        setUser((prev: User) => ({
          ...prev,
          notifications: [
            {
              email_notifications: false,
              app_notifications: false,
              no_notifications: false,
            },
          ],
        }));
        setCategories(false);
      } else {
        setCategories(true);
      }
    }
  };
  const handleBackClick = () => {
    if (pathName === "/register/step7") {
      router.push("/register/step6");
      setUser((prev: User) => ({
        ...prev,
        cultures: [],
      }));
    }
  };
  return (
    <div className="container text-center">
      <div className="container d-flex justify-content-between">
        <div>
          <SelectLabels content={"Action"} type={"Action"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels content={"Comedy"} type={"Comedy"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels content={"Drama"} type={"Drama"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels content={"Horror"} type={"Horror"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels
            content={"Science Fiction"}
            type={"Sci-Fi"}
            padding={"px-3"}
          />
        </div>
      </div>
      <div className="container d-flex justify-content-evenly mt-2">
        <div>
          <SelectLabels content={"Fantasy"} type={"Fantasy"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels content={"Romance"} type={"Romance"} padding={"px-3"} />
        </div>
        <div>
          <SelectLabels
            content={"Thriller"}
            type={"Thriller"}
            padding={"px-3"}
          />
        </div>
        <div>
          <SelectLabels content={"Balkan"} type={"Balkan"} padding={"px-3"} />
        </div>
      </div>
      {categories && <small className="text-danger">please select!</small>}
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

export default StepSevenComponent;
