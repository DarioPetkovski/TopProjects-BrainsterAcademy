import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

export const Favorites = () => {
  const { toggleFavoritesModal } = useGlobalContext();

  const handleOpenFavoritesModal = () => {
    toggleFavoritesModal();
  };
  return (
    <div className="container">
      <div className="row py-5 d-flex justify-content-end">
        {/* button should open favorites modal */}
        <button
          onClick={handleOpenFavoritesModal}
          className="border-3 btn border-light d-flex justify-content-between rounded-2 w-25 bg-white"
        >
          Омилено
          <div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.18123 24.5908C4.60317 25.0126 5.17536 25.2495 5.77198 25.2495C6.3686 25.2495 6.94079 25.0126 7.36273 24.5908L18.5002 13.4533L29.6377 24.5908C30.0621 25.0006 30.6304 25.2274 31.2204 25.2223C31.8103 25.2171 32.3747 24.9805 32.7918 24.5633C33.209 24.1462 33.4456 23.5818 33.4507 22.9919C33.4559 22.402 33.2291 21.8336 32.8192 21.4093L20.091 8.681C19.669 8.25919 19.0968 8.02223 18.5002 8.02223C17.9036 8.02223 17.3314 8.25919 16.9095 8.681L4.18123 21.4093C3.75942 21.8312 3.52246 22.4034 3.52246 23C3.52246 23.5966 3.75942 24.1688 4.18123 24.5908Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
