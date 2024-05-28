"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/src/context/Context";
import RegisterForm from "@/src/components/registerForm";
import { User } from "@/src/Interfaces/Interfaces";

export default function StepOne() {
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
          <div className="w-100 container-content d-flex flex-column align-items-center">
            <h1>Join as a viewer or artist:</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
