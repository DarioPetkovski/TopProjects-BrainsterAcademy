import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { User } from "../Interfaces/Interfaces";
import { usePathname } from "next/navigation";

function SelectLabels({
  content,
  type,
  padding,
}: {
  content: string;
  type: string;
  padding: string;
}) {
  const pathName = usePathname();
  const { setUser } = useGlobalContext();
  const [check, setCheck] = useState<boolean>(false);

  const onChangeHandleInterests = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setUser((prev: User) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((item: string) => item !== value),
    }));
  };
  const onChangeHandleCultures = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setUser((prev: User) => ({
      ...prev,
      cultures: checked
        ? [...prev.cultures, value]
        : prev.cultures.filter((item: string) => item !== value),
    }));
  };
  const onChangeHandleFavCategories = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;
    setUser((prev: User) => ({
      ...prev,
      fav_categories: checked
        ? [...prev.fav_categories, value]
        : prev.fav_categories.filter((item: string) => item !== value),
    }));
  };

  return (
    <>
      <label
        className={`w-100 text-center py-1 ${
          check ? "option-btn-checked" : "option-btn"
        } ${padding}`}
        htmlFor={type}
      >
        {content}
      </label>
      <input
        onChange={(e) => {
          setCheck((prev) => !prev);
          {
            pathName === "/register/step2" && onChangeHandleInterests(e);
          }
          {
            pathName === "/register/step6" && onChangeHandleCultures(e);
          }
          {
            pathName === "/register/step7" && onChangeHandleFavCategories(e);
          }
        }}
        className="d-none"
        type="checkbox"
        id={type}
        value={type}
        name={type}
      />
    </>
  );
}

export default SelectLabels;
