"use client";
import { useEffect, useState } from "react";
import RegisterForm from "@/src/components/registerForm";
import { useGlobalContext } from "@/src/context/Context";
import { useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

export default function StepSix() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState<User>({} as User);
  useEffect(() => {
    if (userInfo) {
      setUserInfo(user);
    }
  }, [userInfo]);
  useEffect(() => {
    setUserName(user.userName);
  }, []);

  useEffect(() => {
    if (user.isLogged) {
      router.push("/homepage");
    }
  }, [user.isLogged, router]);

  if (!userInfo.isLogged) {
    return (
      <div className="signIn-BG d-flex align-items-center text-white">
        <div className="container signInCon px-0 d-flex align-items-center">
          <div className="w-100 container-content d-flex flex-column align-items-center pb-5">
            <div className="container">
              <div className="row justify-content-center mb-5">
                <div className="col-2">
                  <img
                    className="w-100"
                    style={{ borderRadius: "50%" }}
                    src={user.img}
                    alt=""
                  />
                  <h5 className="text-center mb-0 nickName mt-1">{userName}</h5>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start justify-content-start mb-3">
              <span className="badgee text-center">5</span>
              <div className="text-center">
                <h4 className="px-2 mb-0">Which cultures resonate with you?</h4>
                <small>
                  <i>Your choices help us curate content just for you</i>
                </small>
              </div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
