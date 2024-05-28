import React, { Dispatch, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

function StepEightComponent() {
  const { setUser } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();

  const [emailNotification, setEmailNotification] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [noNotification, setNoNotification] = useState(false);
  const [errSelect, setErrSelect] = useState(false);

  const handleCheckboxChange = (
    setter: Dispatch<React.SetStateAction<boolean>>,
    notificationType: string
  ) => {
    setter(true);

    if (notificationType === "email_notifications") {
      setAppNotification(false);
      setNoNotification(false);
    } else if (notificationType === "app_notifications") {
      setEmailNotification(false);
      setNoNotification(false);
    } else if (notificationType === "no_notifications") {
      setEmailNotification(false);
      setAppNotification(false);
    }

    setUser((prevUser: User) => ({
      ...prevUser,
      notifications: [
        {
          email_notifications: notificationType === "email_notifications",
          app_notifications: notificationType === "app_notifications",
          no_notifications: notificationType === "no_notifications",
        },
      ],
    }));
  };

  const handleNextClick = () => {
    if (pathName === "/register/step8") {
      if (!emailNotification && !appNotification && !noNotification) {
        setErrSelect(true);
      } else {
        setErrSelect(false);
        router.push("/register/step9");
        setUser((prev: User) => ({
          ...prev,
          privacy: "",
        }));
      }
    }
  };
  const handleBackClick = () => {
    if (pathName === "/register/step8") {
      router.push("/register/step7");
      setUser((prev: User) => ({
        ...prev,
        fav_categories: [],
      }));
    }
  };
  return (
    <div className="container text-center">
      <div className="container">
        <div
          className="checkbox d-flex align-items-center w-50 pointer"
          onClick={() =>
            handleCheckboxChange(setEmailNotification, "email_notifications")
          }
        >
          <FontAwesomeIcon
            icon={emailNotification ? faCheckSquare : faSquare}
            className="fa-2x"
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(56, 174, 0, 1)",
              color: "white",
              borderRadius: "3px",
            }}
          />
          <h5>Sign up for Email Notifications</h5>
        </div>
        <div
          className="checkbox d-flex align-items-center mt-4 w-50 pointer"
          onClick={() =>
            handleCheckboxChange(setAppNotification, "app_notifications")
          }
        >
          <FontAwesomeIcon
            icon={appNotification ? faCheckSquare : faSquare}
            className="fa-2x"
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(56, 174, 0, 1)",
              color: "white",
              borderRadius: "3px",
            }}
          />
          <h5>App Push Notification</h5>
        </div>
        <div
          className="checkbox d-flex align-items-center mt-4 w-50 pointer"
          onClick={() =>
            handleCheckboxChange(setNoNotification, "no_notifications")
          }
        >
          <FontAwesomeIcon
            icon={noNotification ? faCheckSquare : faSquare}
            className="fa-2x"
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(56, 174, 0, 1)",
              color: "white",
              borderRadius: "3px",
            }}
          />
          <h5>No Notification</h5>
        </div>
      </div>
      {errSelect && <small className="text-danger">please select!</small>}
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

export default StepEightComponent;
