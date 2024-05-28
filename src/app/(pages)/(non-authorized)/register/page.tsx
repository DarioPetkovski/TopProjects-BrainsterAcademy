"use client";
import { useEffect, useState } from "react";
import ContainerImg from "@/src/components/ContainerImg";
import LineSeparete from "@/src/components/LineSeparete";
import LoginForm from "@/src/components/LoginForm";
import SocialMediaBar from "@/src/components/SocialMediaBar";
import { useGlobalContext } from "@/src/context/Context";
import { useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

export default function Register() {
  const router = useRouter();
  const { user, setUser } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  useEffect(() => {
    if (userInfo) {
      setUserInfo(user);
    }
  }, [userInfo]);

  useEffect(() => {
    if (user.isLogged) {
      router.push("/homepage");
    } else {
      setUser((prev: User) => ({
        ...prev,
        email: "",
        password: "",
      }));
    }
  }, [user.isLogged, router]);

  if (!userInfo.isLogged) {
    return (
      <div className="signIn-BG d-flex align-items-center text-white">
        <div className="container signInCon px-0 d-flex align-items-center">
          <ContainerImg />
          <div className="container-content d-flex flex-column align-items-center">
            <h4>Create your account</h4>
            <SocialMediaBar />
            <LineSeparete />
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
