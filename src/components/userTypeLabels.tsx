import { Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "../context/Context";
import { User } from "../Interfaces/Interfaces";
import { usePathname } from "next/navigation";

function UserTypeLabels({
  content,
  type,
  isActive,
  setActiveUserType,
}: {
  content: string;
  type: string;
  isActive: boolean;
  setActiveUserType: Dispatch<SetStateAction<string>>;
}) {
  const { setUser } = useGlobalContext();
  const pathName = usePathname();
  const onClickGetActive = () => {
    setActiveUserType(type);
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {pathName === "/register/step1" && (
        <label
          onClick={onClickGetActive}
          htmlFor={type}
          className={`py-3 px-4 ${isActive ? "active" : "form-content"}`}
        >
          <div className="user-card">
            <div className="radio-btn">
              <div className="d-flex justify-content-between">
                <img
                  className="active-img"
                  src={`/assets/images/${type}.png`}
                  alt=""
                />
                <input
                  type="radio"
                  name="type"
                  onChange={onChangeHandle}
                  value={type}
                  id={type}
                />
              </div>
              <h5 className="mt-1">{content}</h5>
            </div>
          </div>
        </label>
      )}
      {pathName === "/register/step3" && (
        <>
          <label
            className={`w-100 text-center py-1 ${
              isActive ? "option-btn-checked" : "option-btn"
            }`}
            onClick={onClickGetActive}
            htmlFor={type}
          >
            <div className="d-flex align-items-center justify-contnet-center">
              <div className="px-3">
                <img
                  className="totorial-img"
                  src={`/assets/images/${type}.png`}
                  alt=""
                />
              </div>
              {content}
            </div>
            <input
              className="d-none"
              type="radio"
              name="totorial"
              onChange={onChangeHandle}
              value={type}
              id={type}
            />
          </label>
        </>
      )}
      {pathName === "/register/step9" && (
        <>
          <label
            className={`w-100 text-center py-1 ${
              isActive ? "option-btn-checked" : "option-btn"
            }`}
            onClick={onClickGetActive}
            htmlFor={type}
          >
            <p className="mb-0">{content}</p>
            <input
              className="d-none"
              type="radio"
              name="privacy"
              onChange={onChangeHandle}
              value={type}
              id={type}
            />
          </label>
        </>
      )}
    </>
  );
}

export default UserTypeLabels;
