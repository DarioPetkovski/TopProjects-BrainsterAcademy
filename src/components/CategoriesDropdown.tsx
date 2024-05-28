import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";

function CategoriesDropdown() {
  const { onClickFilterGener, geners, setGeners } = useGlobalContext();
  const [showDrop, setShowDrop] = useState(false);

  useEffect(() => {
    setShowDrop(false);
  }, [geners]);

  const onClickFilterAll = () => {
    setGeners({
      action: false,
      comedy: false,
      horror: false,
      drama: false,
      history: false,
      sciFi: false,
      thriller: false,
      documentaries: false,
    });
  };

  return (
    <div className="categories_Dropdown position-absolute">
      <div
        onClick={() => setShowDrop((prev: boolean) => !prev)}
        className="pointer d-flex justify-content-between align-items-center"
      >
        <p className="mb-0">Categories</p>
        <img className="px-2" src="/assets/images/dropdownArrow.png" alt="" />
      </div>
      {showDrop && (
        <>
          <p onClick={onClickFilterAll} className="pointer mt-3">
            All
          </p>
          <p onClick={() => onClickFilterGener("action")} className="pointer">
            Action
          </p>
          <p onClick={() => onClickFilterGener("comedy")} className="pointer">
            Comedy
          </p>
          <p onClick={() => onClickFilterGener("horror")} className="pointer">
            Horror
          </p>
          <p onClick={() => onClickFilterGener("drama")} className="pointer">
            Drama
          </p>
          <p onClick={() => onClickFilterGener("history")} className="pointer">
            History
          </p>
          <p onClick={() => onClickFilterGener("sciFi")} className="pointer">
            Sci-Fi
          </p>
          <p onClick={() => onClickFilterGener("thriller")} className="pointer">
            Thriller
          </p>
          <p
            onClick={() => onClickFilterGener("documentaries")}
            className="pointer"
          >
            Documentaries
          </p>
        </>
      )}
    </div>
  );
}

export default CategoriesDropdown;
