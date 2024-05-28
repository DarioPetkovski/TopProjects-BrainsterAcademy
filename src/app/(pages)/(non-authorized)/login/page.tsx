"use client";

import { useEffect, useState } from "react";
import ContainerImg from "@/src/components/ContainerImg";
import LineSeparete from "@/src/components/LineSeparete";
import LoginForm from "@/src/components/LoginForm";
import SocialMediaBar from "@/src/components/SocialMediaBar";
import { useGlobalContext } from "@/src/context/Context";
import { useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

export default function LogIn() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  useEffect(() => {
    if (userInfo) {
      setUserInfo(user);
    }
  }, [userInfo]);

  useEffect(() => {
    if (user.isLogged) {
      router.push("/homepage");
    }
  }, [user.isLogged, router]);

  if (!userInfo.isLogged) {
    return (
      <div className="signIn-BG d-flex align-items-center text-white">
        <div className="container signInCon px-0 d-flex align-items-center">
          <ContainerImg />
          <div className="container-content d-flex flex-column align-items-center">
            <h4>Welcome!</h4>
            <small className="pb-3">Join us!</small>
            <LoginForm />
            <LineSeparete />
            <SocialMediaBar />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
