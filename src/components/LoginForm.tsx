"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/Context";
import { User } from "../Interfaces/Interfaces";
import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const { user, setUser, data } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  const [emailMessage, setEmailMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [usedEmail, setUsedEmail] = useState(false);
  const [incorrectPass, setIncorrectPass] = useState(false);

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    const loggedUser = data.users?.find(
      (item: User) => item.email === user.email
    );

    if (
      loggedUser?.email === user.email &&
      loggedUser?.password === user.password
    ) {
      setUser((prev: User) => ({
        ...prev,
        isLogged: true,
      }));
      const updateIsLogged = {
        ...loggedUser,
        isLogged: true,
      };
      axios.put(
        `http://localhost:5001/users/${loggedUser?.id}`,
        updateIsLogged
      );
      setEmailMessage(false);
      setPasswordMessage(false);
      setIncorrectPass(false);
    } else {
      setIncorrectPass(true);
      setPasswordMessage(false);
      setEmailMessage(false);
      if (user.email === "") {
        setEmailMessage(true);
        setPasswordMessage(false);
        setIncorrectPass(false);
      } else if (user.password === "") {
        setEmailMessage(false);
        setPasswordMessage(true);
        setIncorrectPass(false);
      } else if (user.email === "" && user.password === "") {
        setEmailMessage(true);
        setPasswordMessage(true);
        setIncorrectPass(false);
      }
    }
  };
  const onClickHandle = () => {
    if (user.email === "" || user.password === "") {
      setEmailMessage(user.email === "");
      setPasswordMessage(user.password === "");
      return;
    }
    const userWithEmailPassword = data.users?.find(
      (item: User) => item.email === user.email
    );

    if (userWithEmailPassword) {
      setUsedEmail(true);
      setEmailMessage(false);
      setPasswordMessage(false);
      return;
    }
    setUsedEmail(false);
    setEmailMessage(false);
    setPasswordMessage(false);
    router.push("/register/step1");
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form
      onSubmit={onSubmitHandle}
      className={`d-flex flex-column w-75 ${
        pathName === "/register" ? "mt-3" : ""
      }`}
    >
      <input
        className="w-100"
        type="email"
        placeholder="Email adress"
        name="email"
        value={user.email}
        onChange={onChangeHandle}
      />
      {emailMessage && (
        <small className="text-danger">please enter email!</small>
      )}
      {pathName === "/register" && usedEmail && (
        <small className="text-danger">email is alredy used!</small>
      )}
      <input
        className="mt-3 w-100"
        type="password"
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={onChangeHandle}
      />
      {passwordMessage && (
        <small className="text-danger">please enter password!</small>
      )}
      {pathName === "/login" && incorrectPass && (
        <small className="text-danger">incorrect email or password!</small>
      )}
      {pathName === "/login" ? (
        <button className="submit-Btn mt-4" type="submit">
          Log in
        </button>
      ) : (
        <button
          onClick={onClickHandle}
          className="submit-Btn mt-3"
          type="button"
        >
          Register
        </button>
      )}
    </form>
  );
}

export default LoginForm;
