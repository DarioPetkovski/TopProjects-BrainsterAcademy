"use client";
import { useEffect, useState } from "react";
import RegisterForm from "@/src/components/registerForm";
import { useGlobalContext } from "@/src/context/Context";
import { useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";

export default function StepFive() {
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
            <div className="d-flex align-items-start justify-content-start mb-3">
              <span className="badgee text-center">4</span>
              <h5 className="px-2">Setup Profile</h5>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
