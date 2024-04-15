import { Link, useLocation } from "react-router-dom";
import "./card.css";
import { Product, Test } from "../../interfaces/interfaces";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import React from "react";

export const ProductCard = (props: Test) => {
  const { pathname } = useLocation();
  const { toggleFavorite, toggleNotifications, data } = useGlobalContext();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [hasNotifications, setHasNotifications] = useState<boolean>(false);

  useEffect(() => {
    const product = data?.find((product) => product.id === props.id);
    if (product) {
      setIsFavorite(product.isFavorite);
      setHasNotifications(product.notifications);
    }
  }, [data, props.id]);

  const handleFavourites = (event: any, id: string) => {
    event?.preventDefault();
    toggleFavorite(id);
  };

  const handleNotification = (event: any, id: string) => {
    event?.preventDefault();
    toggleNotifications(id);
  };

  return (
    <Link
      to={`/productpage/${props.id}`}
      className="text-decoration-none flex-grow-1"
    >
      <div className="card border-0 rounded-3 shadow-lg h-100 card-w">
        <div className="d-flex pt-2 justify-content-between">
          <div onClick={(event) => handleNotification(event, props.id)}>
            {hasNotifications ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 28 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-1"
              >
                <path
                  d="M28 27.2143V28.7857H0V27.2143L3.11111 24.0714V14.6429C3.11111 9.77143 6.26889 5.48143 10.8889 4.09857V3.64286C10.8889 2.80932 11.2167 2.00992 11.8001 1.42052C12.3836 0.831121 13.1749 0.5 14 0.5C14.8251 0.5 15.6164 0.831121 16.1999 1.42052C16.7833 2.00992 17.1111 2.80932 17.1111 3.64286V4.09857C21.7311 5.48143 24.8889 9.77143 24.8889 14.6429V24.0714L28 27.2143ZM17.1111 30.3571C17.1111 31.1907 16.7833 31.9901 16.1999 32.5795C15.6164 33.1689 14.8251 33.5 14 33.5C13.1749 33.5 12.3836 33.1689 11.8001 32.5795C11.2167 31.9901 10.8889 31.1907 10.8889 30.3571"
                  fill="#FFA500"
                />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 39 37"
                fillOpacity="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-1"
              >
                <rect
                  x="0.753906"
                  width="38"
                  height="37"
                  rx="9"
                  fill="#FFA500"
                  fillOpacity="0.65"
                />
                <path
                  d="M28.8508 23.1102C28.3015 22.191 27.4849 19.5899 27.4849 16.1926C27.4849 14.1524 26.6507 12.1958 25.1658 10.7531C23.6809 9.31047 21.6669 8.5 19.5669 8.5C17.4669 8.5 15.4529 9.31047 13.968 10.7531C12.4831 12.1958 11.6489 14.1524 11.6489 16.1926C11.6489 19.5909 10.8313 22.191 10.282 23.1102C10.1417 23.344 10.0674 23.6095 10.0664 23.88C10.0655 24.1505 10.1379 24.4165 10.2766 24.6512C10.4152 24.8858 10.615 25.0808 10.856 25.2164C11.0969 25.3521 11.3704 25.4236 11.6489 25.4238H15.6881C15.8707 26.2923 16.3566 27.0728 17.0634 27.6333C17.7701 28.1938 18.6545 28.5 19.5669 28.5C20.4793 28.5 21.3637 28.1938 22.0705 27.6333C22.7772 27.0728 23.2631 26.2923 23.4457 25.4238H27.4849C27.7633 25.4234 28.0367 25.3518 28.2775 25.2161C28.5183 25.0804 28.718 24.8854 28.8565 24.6508C28.995 24.4161 29.0674 24.1502 29.0664 23.8798C29.0654 23.6093 28.991 23.3439 28.8508 23.1102ZM19.5669 26.9623C19.0758 26.9622 18.5968 26.8142 18.1959 26.5386C17.795 26.2631 17.4918 25.8736 17.3281 25.4238H21.8057C21.642 25.8736 21.3388 26.2631 20.9379 26.5386C20.537 26.8142 20.058 26.9622 19.5669 26.9623Z"
                  fillOpacity="white"
                />
              </svg>
            )}
          </div>
          <div onClick={(event) => handleFavourites(event, props.id)}>
            {isFavorite ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-1"
              >
                <path
                  d="M30.0074 10.8263C32.8639 8.26932 36.5912 6.90349 40.4234 7.0095C44.2557 7.11552 47.9018 8.68532 50.6124 11.3963C53.3208 14.1043 54.8907 17.7457 55.0004 21.574C55.1101 25.4024 53.7513 29.1277 51.2024 31.9863L30.0024 53.2163L8.80744 31.9863C6.25558 29.1262 4.89545 25.3977 5.00628 21.5663C5.11711 17.7348 6.6905 14.0912 9.40342 11.3834C12.1164 8.67559 15.763 7.10908 19.5946 7.00549C23.4262 6.90189 27.1522 8.26906 30.0074 10.8263Z"
                  fill="#FFA500"
                />
              </svg>
            ) : (
              <svg
                width="30"
                height="27"
                viewBox="0 0 30 27"
                fillOpacity="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-1"
              >
                <path
                  d="M21.5745 0.538818C19.0091 0.538818 16.7323 1.56661 15.1897 3.33318C13.6471 1.56661 11.3703 0.538818 8.8049 0.538818C6.5705 0.541562 4.42839 1.44368 2.84843 3.04731C1.26847 4.65093 0.379657 6.82512 0.376953 9.09298C0.376953 18.4689 13.8885 25.9602 14.4631 26.2752C14.6864 26.3973 14.9361 26.4611 15.1897 26.4611C15.4433 26.4611 15.693 26.3973 15.9163 26.2752C16.4909 25.9602 30.0025 18.4689 30.0025 9.09298C29.9998 6.82512 29.111 4.65093 27.531 3.04731C25.951 1.44368 23.8089 0.541562 21.5745 0.538818ZM20.8735 18.9899C19.095 20.5217 17.1938 21.9003 15.1897 23.1114C13.1856 21.9003 11.2844 20.5217 9.50595 18.9899C6.73878 16.5805 3.44166 12.9061 3.44166 9.09298C3.44166 7.64926 4.00672 6.26467 5.01252 5.2438C6.01832 4.22294 7.38248 3.64942 8.8049 3.64942C11.0779 3.64942 12.9806 4.86774 13.771 6.83002C13.8861 7.11607 14.0824 7.36087 14.3351 7.53318C14.5878 7.7055 14.8853 7.79752 15.1897 7.79752C15.4941 7.79752 15.7916 7.7055 16.0443 7.53318C16.297 7.36087 16.4934 7.11607 16.6084 6.83002C17.3989 4.86774 19.3015 3.64942 21.5745 3.64942C22.9969 3.64942 24.3611 4.22294 25.3669 5.2438C26.3727 6.26467 26.9378 7.64926 26.9378 9.09298C26.9378 12.9061 23.6406 16.5805 20.8735 18.9899Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="position-relative m-0">
          <img
            className="w-100 img-height rounded-3"
            src={require(`../../assets/images/${props.image}`)}
            alt="image"
          />

          <div className="position-absolute bottom-0 end-0 p-1 mr-1 card-discount rounded-5">
            <p className="text-white mb-0">{props.discount}%</p>
          </div>
        </div>
        <div
          className={`position-relative p-3 ${
            pathname === "/" ? "" : "card-heigth-second"
          } `}
        >
          <h6 className="fw-bold">{props.name}</h6>
          <p className="mb-0">{props.desc}</p>
          <div className="text-container">
            <small className="mb-0 strike-through">{props.price} ден.</small>
          </div>

          <div className="d-flex justify-content-between">
            <p className="fw-bold">{props.price} ден.</p>
            <div>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-1"
              >
                <path
                  d="M21.0215 8.93522L16.849 12.4784L18.0989 17.7535C18.165 18.0292 18.1461 18.3179 18.0446 18.5832C17.9431 18.8486 17.7634 19.079 17.528 19.2456C17.2927 19.4121 17.0121 19.5075 16.7213 19.5197C16.4305 19.532 16.1425 19.4606 15.8933 19.3144L11.1647 16.5238L6.44628 19.3144C6.19701 19.4606 5.90899 19.532 5.61822 19.5197C5.32746 19.5075 5.04685 19.4121 4.81149 19.2456C4.57612 19.079 4.39645 18.8486 4.29492 18.5832C4.19339 18.3179 4.17452 18.0292 4.24066 17.7535L5.48872 12.4838L1.31525 8.93522C1.09451 8.74998 0.934895 8.50546 0.856416 8.23231C0.777936 7.95915 0.784089 7.66954 0.874101 7.39978C0.964114 7.13001 1.13398 6.89211 1.3624 6.71591C1.59081 6.53971 1.86761 6.43304 2.15809 6.40929L7.65918 5.94569L9.80652 0.962251C9.91865 0.700761 10.1078 0.477398 10.3501 0.320288C10.5925 0.163179 10.8772 0.0793457 11.1684 0.0793457C11.4596 0.0793457 11.7443 0.163179 11.9866 0.320288C12.229 0.477398 12.4181 0.700761 12.5302 0.962251L14.684 5.94569L20.1833 6.40929C20.4738 6.43304 20.7506 6.53971 20.979 6.71591C21.2074 6.89211 21.3773 7.13001 21.4673 7.39978C21.5573 7.66954 21.5634 7.95915 21.485 8.23231C21.4065 8.50546 21.2469 8.74998 21.0261 8.93522H21.0215Z"
                  fill="#FFA500"
                />
              </svg>
              <span className="align-center d-inline-block">
                {props.rating}.0
              </span>
            </div>
          </div>
          {pathname !== "/productlisting" ? (
            ""
          ) : (
            <p className="position-absolute text-secondary bottom-0 start-0">
              {props.store} Продавници
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
