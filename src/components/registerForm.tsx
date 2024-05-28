"use client";
import { usePathname } from "next/navigation";
import StepOneComponent from "./stepComponents/StepOneComponent";
import StepTwoComponent from "./stepComponents/StepTwoComponent";
import StepFourComponent from "./stepComponents/StepFourComponent";
import StepFiveComponent from "./stepComponents/StepFiveComponent";
import StepSixComponent from "./stepComponents/StepSixComponent";
import StepThreeComponent from "./stepComponents/StepThreeComponent";
import StepSevenComponent from "./stepComponents/StepSevenComponent";
import StepEightComponent from "./stepComponents/StepEightComponent";
import StepNineComponent from "./stepComponents/StepNineComponent";
import { useGlobalContext } from "../context/Context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "../Interfaces/Interfaces";
import axios from "axios";

function RegisterForm() {
  const pathName = usePathname();
  const { user, setUser, setUsers, data } = useGlobalContext();
  const router = useRouter();
  const [privacy, setPrivacy] = useState(false);
  const { email_notifications, app_notifications, no_notifications } =
    user.notifications[0];
  const atLeastOneTrue = [
    email_notifications,
    app_notifications,
    no_notifications,
  ].some((flag) => flag === true);
  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    if (
      user.privacy !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.confPassword !== "" &&
      user.type !== "" &&
      user.interests.length !== 0 &&
      user.totorial !== "" &&
      user.subscribtion !== "" &&
      user.userName !== "" &&
      user.bio !== "" &&
      user.cultures.length !== 0 &&
      user.fav_categories.length !== 0 &&
      atLeastOneTrue &&
      user.isLogged !== true
    ) {
      setPrivacy(false);
      setUser((prev: User) => ({
        ...prev,
        isLogged: true,
      }));
      const users = [...data.users, user];
      setUsers(users);
      axios.post("http://localhost:5001/users", { ...user });
    } else if (user.privacy === "") {
      setPrivacy(true);
    } else {
      router.push("/register");
    }
  };
  return (
    <form
      onSubmit={handleSubmitClick}
      className={`${
        pathName === "/register/step4" ? "w-100" : "w-75"
      } d-flex justify-content-between align-items-between ${
        pathName === "/register/step4" ? "px-4" : "px-0"
      } mt-4 flex-column`}
    >
      <div className="d-flex justify-content-between align-items-between w-100">
        {pathName === "/register/step1" && <StepOneComponent />}
        {pathName === "/register/step2" && <StepTwoComponent />}
        {pathName === "/register/step3" && <StepThreeComponent />}
        {pathName === "/register/step4" && <StepFourComponent />}
        {pathName === "/register/step5" && <StepFiveComponent />}
        {pathName === "/register/step6" && <StepSixComponent />}
        {pathName === "/register/step7" && <StepSevenComponent />}
        {pathName === "/register/step8" && <StepEightComponent />}
        {pathName === "/register/step9" && (
          <StepNineComponent privacy={privacy} />
        )}
      </div>
    </form>
  );
}

export default RegisterForm;
