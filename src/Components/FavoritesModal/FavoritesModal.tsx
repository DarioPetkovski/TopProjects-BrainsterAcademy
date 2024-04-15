import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Product } from "../../interfaces/interfaces";
import { ProductSection } from "../HomePage/ProductSection/ProductSection";
import { ProductCard } from "../ProductCard/ProducCard";
import { ReminderModal } from "./ReminderModal/Reminder";
import "./favoritemodal.css";
import React from "react";

export const FavoritesModal = () => {
  const { toggleFavoritesModal, data } = useGlobalContext();
  const [showFavorites, setShowFavorites] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
  const filteredItems = data?.filter((item) => item.isFavorite);
  const handleOpenFavoritesModal = () => {
    toggleFavoritesModal();
  };

  const renderCards = () => {
    return filteredItems?.slice(0, 6).map((card: Product) => {
      return (
        <div key={card.id} className="col-2 mb-3">
          <ProductCard
            name={card.name}
            image={card.image}
            price={card.price}
            rating={card.rating}
            discount={card.discount}
            id={card.id}
          />
        </div>
      );
    });
  };
  const toggleSection = (section: string) => {
    setShowFavorites(section === "favorites");
    setShowNotifications(section === "notifications");
    setShowRecentlyViewed(section === "recentlyViewed");
  };
  return (
    <div className="modal-wrapper">
      <div className="gradient-overlay"></div>
      <div className="container rounded-5 py-5 custom-height bg-modal">
        <p
          onClick={handleOpenFavoritesModal}
          className="pr-5 cursor display-6 mb-0 text-end"
        >
          X
        </p>

        {showFavorites && (
          <div>
            <h2>Омилено</h2>
            <div className="d-flex my-5">{renderCards()}</div>
          </div>
        )}

        {showNotifications && <ReminderModal />}
        {showRecentlyViewed && (
          <ProductSection title="Последно посетени производи" />
        )}

        <div className="row bg-white rounded-5 mx-5 py-3">
          <div className="d-flex justify-content-around">
            <button
              onClick={() => toggleSection("favorites")}
              className="btn  text-center"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0074 10.8263C32.8639 8.26932 36.5912 6.90349 40.4234 7.0095C44.2557 7.11552 47.9018 8.68532 50.6124 11.3963C53.3208 14.1043 54.8907 17.7457 55.0004 21.574C55.1101 25.4024 53.7513 29.1277 51.2024 31.9863L30.0024 53.2163L8.80744 31.9863C6.25558 29.1262 4.89545 25.3977 5.00628 21.5663C5.11711 17.7348 6.6905 14.0912 9.40342 11.3834C12.1164 8.67559 15.763 7.10908 19.5946 7.00549C23.4262 6.90189 27.1522 8.26906 30.0074 10.8263Z"
                  fill="#FFA500"
                />
              </svg>
              <p>Омилено</p>
            </button>
            <button
              onClick={() => toggleSection("notifications")}
              className="btn text-center"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 28 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 27.2143V28.7857H0V27.2143L3.11111 24.0714V14.6429C3.11111 9.77143 6.26889 5.48143 10.8889 4.09857V3.64286C10.8889 2.80932 11.2167 2.00992 11.8001 1.42052C12.3836 0.831121 13.1749 0.5 14 0.5C14.8251 0.5 15.6164 0.831121 16.1999 1.42052C16.7833 2.00992 17.1111 2.80932 17.1111 3.64286V4.09857C21.7311 5.48143 24.8889 9.77143 24.8889 14.6429V24.0714L28 27.2143ZM17.1111 30.3571C17.1111 31.1907 16.7833 31.9901 16.1999 32.5795C15.6164 33.1689 14.8251 33.5 14 33.5C13.1749 33.5 12.3836 33.1689 11.8001 32.5795C11.2167 31.9901 10.8889 31.1907 10.8889 30.3571"
                  fill="#FFA500"
                />
              </svg>
              <p>Известувања за цени</p>
            </button>
            <button
              onClick={() => toggleSection("recentlyViewed")}
              className="btn text-center"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 10C23.0325 10 16.8425 13.1425 12.435 17.0325C10.225 18.985 8.4 21.175 7.115 23.36C5.85 25.5025 5 27.825 5 30C5 32.175 5.85 34.4975 7.115 36.64C8.4 38.8225 10.2225 41.015 12.435 42.9675C16.8425 46.8575 23.035 50 30 50C36.9675 50 43.1575 46.8575 47.565 42.9675C49.7775 41.015 51.6 38.8225 52.885 36.64C54.15 34.4975 55 32.175 55 30C55 27.825 54.15 25.5025 52.885 23.36C51.6 21.1775 49.7775 18.985 47.565 17.0325C43.1575 13.1425 36.965 10 30 10ZM35 30C35.9 30 36.7425 29.7625 37.4725 29.3475C37.6057 30.8805 37.2642 32.4174 36.4942 33.7497C35.7243 35.0819 34.5631 36.1452 33.1683 36.7951C31.7735 37.445 30.2126 37.6501 28.6972 37.3827C27.1819 37.1153 25.7854 36.3882 24.6974 35.3001C23.6093 34.2121 22.8822 32.8156 22.6148 31.3003C22.3474 29.7849 22.5525 28.224 23.2024 26.8292C23.8523 25.4344 24.9156 24.2732 26.2478 23.5033C27.5801 22.7333 29.117 22.3918 30.65 22.525C30.2165 23.2859 29.9905 24.1473 29.9945 25.023C29.9985 25.8987 30.2325 26.758 30.673 27.5149C31.1134 28.2717 31.7449 28.8997 32.5043 29.3358C33.2637 29.7719 34.1243 30.001 35 30Z"
                  fill="#FFA500"
                />
              </svg>

              <p>Последно видено</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
