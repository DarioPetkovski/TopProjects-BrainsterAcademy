"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import UserTypeLabels from "../userTypeLabels";

function StepNineComponent({ privacy }: { privacy: boolean }) {
  const pathName = usePathname();
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const [activeUserType, setActiveUserType] = useState<string>("");

  const handleBackClick = () => {
    if (pathName === "/register/step9") {
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
    }
  };
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-4 px-2">
          <UserTypeLabels
            content={"My Friends"}
            type={"myFriends"}
            isActive={activeUserType === "myFriends"}
            setActiveUserType={setActiveUserType}
          />
        </div>
        <div className="col-4 px-2">
          <UserTypeLabels
            content={"Public"}
            type={"public"}
            isActive={activeUserType === "public"}
            setActiveUserType={setActiveUserType}
          />
        </div>
        <div className="col-4 px-2">
          <UserTypeLabels
            content={"Only me"}
            type={"onlyMe"}
            isActive={activeUserType === "onlyMe"}
            setActiveUserType={setActiveUserType}
          />
        </div>
      </div>
      {privacy && <small className="text-danger">please select!</small>}
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
            <div className="btn-wrapper">
              <button className={`setProfile "mt-5"`} type="submit">
                Set my profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepNineComponent;
