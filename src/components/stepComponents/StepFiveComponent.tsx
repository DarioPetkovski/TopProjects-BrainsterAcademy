"use client";
import { User } from "@/src/Interfaces/Interfaces";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function StepFiveComponent() {
  const pathName = usePathname();
  const router = useRouter();
  const { setUser, user } = useGlobalContext();
  const [err, setErr] = useState<boolean>(false);
  const [inputs, setInputs] = useState<boolean>(false);
  const handleNextClick = () => {
    if (pathName === "/register/step5") {
      if (
        user.bio !== "" &&
        user.confPassword !== "" &&
        user.userName !== "" &&
        user.password !== ""
      ) {
        setInputs(false);
        if (user.password === user.confPassword) {
          router.push("/register/step6");
          setErr(false);
        } else {
          setErr(true);
        }
      } else {
        setInputs(true);
        if (user.password === user.confPassword) {
          setErr(false);
        } else {
          setErr(true);
        }
      }
    }
  };
  const handleBackClick = () => {
    if (pathName === "/register/step5") {
      router.push("/register/step4");
      setUser((prev: User) => ({
        ...prev,
        subscribtion: "",
      }));
    }
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col-4">
          <img
            className="w-100"
            style={{ borderRadius: "50%" }}
            src={user.img}
            alt=""
          />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <input
                onChange={(e: any) => onChangeHandle(e)}
                value={user.userName}
                name="userName"
                placeholder="Username"
                className="w-100 user-input"
                type="text"
              />
            </div>
            <div className="col-12">
              <input
                onChange={(e: any) => onChangeHandle(e)}
                value={user.password}
                name="password"
                placeholder="Password"
                className="w-100 user-input"
                type="password"
              />
              {err && (
                <small className="text-danger">password doesnt't match</small>
              )}
            </div>
            <div className="col-12">
              <input
                onChange={(e: any) => onChangeHandle(e)}
                value={user.confPassword}
                name="confPassword"
                placeholder="Confirm password"
                className="w-100 user-input"
                type="password"
              />
              {err && (
                <small className="text-danger">password doesnt't match</small>
              )}
            </div>
            <div className="col-12">
              <textarea
                onChange={(e: any) => onChangeHandle(e)}
                value={user.bio}
                placeholder="Tell us about ypurself..."
                className="w-100 user-input"
                name="bio"
                id=""
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {inputs && (
        <small className="text-danger">please fill all the inputs!</small>
      )}
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

export default StepFiveComponent;
