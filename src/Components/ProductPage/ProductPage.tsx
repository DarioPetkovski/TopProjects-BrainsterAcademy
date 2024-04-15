import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { Product, Review } from "../../interfaces/interfaces";
import "./ProductPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { ProductCard } from "../ProductCard/ProducCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Overview } from "../Chart/Chart";
import { Swiper, SwiperSlide } from "swiper/react";

function ProductPage() {
  const [pagination, setPagination] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [mapModal, setMapModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const data = useGlobalContext();
  const product = data.data?.find((item: Product) => item.id === id);
  const filterCloseProducts = data.data?.filter(
    (item: Product) => product?.category === item.category
  );
  const [reviews, setReviews] = useState<Review[]>(product?.reviews || []);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const [addReview, setAddReview] = useState<Review>({
    id: reviews?.length,
    name: "",
    comment: "",
    rating: 0,
    img: "userlogo.png",
  });
  const onClickPagination = () => {
    setPagination((prev) => !prev);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/products/${id}`
        );
        const fetchedProduct = response.data;
        setReviews(fetchedProduct.reviews || []);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchData();
  }, [id]);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "rating" ? parseInt(value, 10) : value;
    setAddReview({ ...addReview, [name]: newValue });
  };
  const onSubmitReview = async (e: any) => {
    e.preventDefault();
    // Add the new review to the local state
    const updatedReviews = [...reviews, addReview];
    setReviews(updatedReviews);

    // Prepare the data to send to the server
    const updateProduct = {
      ...product,
      reviews: updatedReviews,
    };

    try {
      // Send the PUT request to update the product
      await axios.put(`http://localhost:5001/products/${id}`, updateProduct);

      const response = await axios.get(`http://localhost:5001/products/${id}`);
      const updatedProduct = response.data;

      // Update the reviews state with the reviews from the updated product data
      setReviews(updatedProduct.reviews);

      // Reset the form and hide the modal
      setAddReview({
        id: reviews.length, // Assuming the new review is added at the end
        name: "",
        comment: "",
        rating: 0,
        img: "userlogo.png",
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
    console.log(reviews);
  };
  const RatingDisplay = (rating: number) => {
    const ratingElements = [];

    for (let i = 0; i < rating; i++) {
      ratingElements.push(
        <p className="mr-2" key={i}>
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0215 8.93522L16.849 12.4784L18.0989 17.7535C18.165 18.0292 18.1461 18.3179 18.0446 18.5832C17.9431 18.8486 17.7634 19.079 17.528 19.2456C17.2927 19.4121 17.0121 19.5075 16.7213 19.5197C16.4305 19.532 16.1425 19.4606 15.8933 19.3144L11.1647 16.5238L6.44628 19.3144C6.19701 19.4606 5.90899 19.532 5.61822 19.5197C5.32746 19.5075 5.04685 19.4121 4.81149 19.2456C4.57612 19.079 4.39645 18.8486 4.29492 18.5832C4.19339 18.3179 4.17452 18.0292 4.24066 17.7535L5.48872 12.4838L1.31525 8.93522C1.09451 8.74998 0.934895 8.50546 0.856416 8.23231C0.777936 7.95915 0.784089 7.66954 0.874101 7.39978C0.964114 7.13001 1.13398 6.89211 1.3624 6.71591C1.59081 6.53971 1.86761 6.43304 2.15809 6.40929L7.65918 5.94569L9.80652 0.962251C9.91865 0.700761 10.1078 0.477398 10.3501 0.320288C10.5925 0.163179 10.8772 0.0793457 11.1684 0.0793457C11.4596 0.0793457 11.7443 0.163179 11.9866 0.320288C12.229 0.477398 12.4181 0.700761 12.5302 0.962251L14.684 5.94569L20.1833 6.40929C20.4738 6.43304 20.7506 6.53971 20.979 6.71591C21.2074 6.89211 21.3773 7.13001 21.4673 7.39978C21.5573 7.66954 21.5634 7.95915 21.485 8.23231C21.4065 8.50546 21.2469 8.74998 21.0261 8.93522H21.0215Z"
              fill="#FFA500"
            />
          </svg>
        </p>
      );
    }

    return <div className="d-flex">{ratingElements}</div>;
  };
  const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
  const [oneStars, setOneStars] = useState<number[]>([]);
  const [twoStars, setTwoStars] = useState<number[]>([]);
  const [threeStars, setThreeStars] = useState<number[]>([]);
  const [fourStars, setFourStars] = useState<number[]>([]);
  const [fiveStars, setFiveStars] = useState<number[]>([]);

  useEffect(() => {
    // Reset state arrays before populating them
    setOneStars([]);
    setTwoStars([]);
    setThreeStars([]);
    setFourStars([]);
    setFiveStars([]);

    // Map the ratings and categorize them into state arrays
    reviews.forEach((item) => {
      switch (item.rating) {
        case 1:
          setOneStars((prev) => [...prev, item.rating]);
          break;
        case 2:
          setTwoStars((prev) => [...prev, item.rating]);
          break;
        case 3:
          setThreeStars((prev) => [...prev, item.rating]);
          break;
        case 4:
          setFourStars((prev) => [...prev, item.rating]);
          break;
        case 5:
          setFiveStars((prev) => [...prev, item.rating]);
          break;
        default:
          break;
      }
    });
  }, [reviews]);
  const totalReviews = reviews.length;
  const oneStarsPercentage = (oneStars.length / totalReviews) * 100;
  const twoStarsPercentage = (twoStars.length / totalReviews) * 100;
  const threeStarsPercentage = (threeStars.length / totalReviews) * 100;
  const fourStarsPercentage = (fourStars.length / totalReviews) * 100;
  const fiveStarsPercentage = (fiveStars.length / totalReviews) * 100;

  return (
    <>
      <div className="container-fluid pl-3 pr-2 py-3">
        <div className="row">
          <div className="col-lg-7">
            <div className="d-flex product-head">
              <div className="img-con">
                <img
                  className="w-100"
                  src={require(`../../assets/images/${product?.image}`)}
                  alt=""
                />
              </div>
              <div className="d-flex flex-column justify-content-between product-content w-100">
                <div className="px-lg-3">
                  <h1>{product?.name}</h1>
                  <div className="d-flex align-items-center">
                    <h5 className="m-0">
                      <span>
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.0215 8.93522L16.849 12.4784L18.0989 17.7535C18.165 18.0292 18.1461 18.3179 18.0446 18.5832C17.9431 18.8486 17.7634 19.079 17.528 19.2456C17.2927 19.4121 17.0121 19.5075 16.7213 19.5197C16.4305 19.532 16.1425 19.4606 15.8933 19.3144L11.1647 16.5238L6.44628 19.3144C6.19701 19.4606 5.90899 19.532 5.61822 19.5197C5.32746 19.5075 5.04685 19.4121 4.81149 19.2456C4.57612 19.079 4.39645 18.8486 4.29492 18.5832C4.19339 18.3179 4.17452 18.0292 4.24066 17.7535L5.48872 12.4838L1.31525 8.93522C1.09451 8.74998 0.934895 8.50546 0.856416 8.23231C0.777936 7.95915 0.784089 7.66954 0.874101 7.39978C0.964114 7.13001 1.13398 6.89211 1.3624 6.71591C1.59081 6.53971 1.86761 6.43304 2.15809 6.40929L7.65918 5.94569L9.80652 0.962251C9.91865 0.700761 10.1078 0.477398 10.3501 0.320288C10.5925 0.163179 10.8772 0.0793457 11.1684 0.0793457C11.4596 0.0793457 11.7443 0.163179 11.9866 0.320288C12.229 0.477398 12.4181 0.700761 12.5302 0.962251L14.684 5.94569L20.1833 6.40929C20.4738 6.43304 20.7506 6.53971 20.979 6.71591C21.2074 6.89211 21.3773 7.13001 21.4673 7.39978C21.5573 7.66954 21.5634 7.95915 21.485 8.23231C21.4065 8.50546 21.2469 8.74998 21.0261 8.93522H21.0215Z"
                            fill="#FFA500"
                          />
                        </svg>
                      </span>
                      {Math.round((totalRating / reviews.length) * 10) / 10 ||
                        "No Reviews"}
                    </h5>
                    <h5 className="ml-3">оцени</h5>
                    <h5 className="ml-3">спореди</h5>
                  </div>
                  <p className="m-0">{product?.desc}</p>
                </div>
                <div className="row px-lg-3">
                  <div className="col-md">
                    <button className="product-btn mb-2 mb-md-0">
                      <span>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.0215 8.93522L16.849 12.4784L18.0989 17.7535C18.165 18.0292 18.1461 18.3179 18.0446 18.5832C17.9431 18.8486 17.7634 19.079 17.528 19.2456C17.2927 19.4121 17.0121 19.5075 16.7213 19.5197C16.4305 19.532 16.1425 19.4606 15.8933 19.3144L11.1647 16.5238L6.44628 19.3144C6.19701 19.4606 5.90899 19.532 5.61822 19.5197C5.32746 19.5075 5.04685 19.4121 4.81149 19.2456C4.57612 19.079 4.39645 18.8486 4.29492 18.5832C4.19339 18.3179 4.17452 18.0292 4.24066 17.7535L5.48872 12.4838L1.31525 8.93522C1.09451 8.74998 0.934895 8.50546 0.856416 8.23231C0.777936 7.95915 0.784089 7.66954 0.874101 7.39978C0.964114 7.13001 1.13398 6.89211 1.3624 6.71591C1.59081 6.53971 1.86761 6.43304 2.15809 6.40929L7.65918 5.94569L9.80652 0.962251C9.91865 0.700761 10.1078 0.477398 10.3501 0.320288C10.5925 0.163179 10.8772 0.0793457 11.1684 0.0793457C11.4596 0.0793457 11.7443 0.163179 11.9866 0.320288C12.229 0.477398 12.4181 0.700761 12.5302 0.962251L14.684 5.94569L20.1833 6.40929C20.4738 6.43304 20.7506 6.53971 20.979 6.71591C21.2074 6.89211 21.3773 7.13001 21.4673 7.39978C21.5573 7.66954 21.5634 7.95915 21.485 8.23231C21.4065 8.50546 21.2469 8.74998 21.0261 8.93522H21.0215Z"
                            fill="#FFA500"
                          />
                        </svg>
                      </span>
                      Близу до тебе
                    </button>
                  </div>
                  <div className="col-md">
                    <button className="product-btn mb-2 mb-md-0 ml-md-3">
                      <span>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 2C10.3921 1.99989 8.36926 2.83176 6.87124 4.31479C5.37323 5.79782 4.52108 7.81216 4.5 9.92C4.5 15.4 11.55 21.5 11.85 21.76C12.0311 21.9149 12.2616 22.0001 12.5 22.0001C12.7384 22.0001 12.9689 21.9149 13.15 21.76C13.5 21.5 20.5 15.4 20.5 9.92C20.4789 7.81216 19.6268 5.79782 18.1288 4.31479C16.6307 2.83176 14.6079 1.99989 12.5 2ZM12.5 19.65C10.83 18.06 6.5 13.65 6.5 9.92C6.5 8.3287 7.13214 6.80258 8.25736 5.67736C9.38258 4.55214 10.9087 3.92 12.5 3.92C14.0913 3.92 15.6174 4.55214 16.7426 5.67736C17.8679 6.80258 18.5 8.3287 18.5 9.92C18.5 13.62 14.17 18.06 12.5 19.65Z"
                            fill="#FFA500"
                          />
                          <path
                            d="M12.5 6C11.8078 6 11.1311 6.20527 10.5555 6.58986C9.97993 6.97444 9.53133 7.52107 9.26642 8.16061C9.00152 8.80015 8.9322 9.50388 9.06725 10.1828C9.2023 10.8618 9.53564 11.4854 10.0251 11.9749C10.5146 12.4644 11.1383 12.7977 11.8172 12.9327C12.4961 13.0678 13.1999 12.9985 13.8394 12.7336C14.4789 12.4687 15.0256 12.0201 15.4101 11.4445C15.7947 10.8689 16 10.1922 16 9.5C16 8.57174 15.6313 7.6815 14.9749 7.02513C14.3185 6.36875 13.4283 6 12.5 6ZM12.5 11C12.2033 11 11.9133 10.912 11.6666 10.7472C11.42 10.5824 11.2277 10.3481 11.1142 10.074C11.0007 9.79994 10.9709 9.49834 11.0288 9.20736C11.0867 8.91639 11.2296 8.64912 11.4393 8.43934C11.6491 8.22956 11.9164 8.0867 12.2074 8.02882C12.4983 7.97094 12.7999 8.00065 13.074 8.11418C13.3481 8.22771 13.5824 8.41997 13.7472 8.66665C13.912 8.91332 14 9.20333 14 9.5C14 9.89782 13.842 10.2794 13.5607 10.5607C13.2794 10.842 12.8978 11 12.5 11Z"
                            fill="#FFA500"
                          />
                        </svg>
                      </span>
                      На залиха
                    </button>
                  </div>
                  <div className="col-md">
                    <button className="product-btn mb-2 mb-md-0 ml-md-3">
                      <span>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.0584 2.976C13.057 2.57538 11.9399 2.57538 10.9384 2.976L4.03004 5.742C3.69633 5.87546 3.41021 6.10576 3.20854 6.40325C3.00686 6.70074 2.89886 7.05179 2.89844 7.4112V16.5864C2.89838 16.9462 3.00616 17.2978 3.20786 17.5958C3.40957 17.8937 3.69595 18.1244 4.03004 18.258L10.9384 21.0216C11.9399 21.4222 13.057 21.4222 14.0584 21.0216L20.9668 18.258C21.3009 18.1244 21.5873 17.8937 21.789 17.5958C21.9907 17.2978 22.0985 16.9462 22.0984 16.5864V7.4112C22.0983 7.05159 21.9904 6.70027 21.7887 6.40255C21.587 6.10482 21.3007 5.87433 20.9668 5.7408L14.0584 2.976ZM11.3848 4.092C12.1001 3.80589 12.898 3.80589 13.6132 4.092L19.8832 6.6L17.1484 7.692L9.76364 4.74L11.3848 4.092ZM8.14844 5.3844L15.5332 8.3376L12.4984 9.5532L5.11364 6.5988L8.14844 5.3844ZM13.0984 10.6044L20.8984 7.4844V16.5852C20.8986 16.7052 20.8629 16.8226 20.7957 16.922C20.7285 17.0215 20.6331 17.0985 20.5216 17.1432L13.6132 19.9068C13.4452 19.9728 13.2724 20.0244 13.0984 20.0604V10.6044ZM11.8984 10.6044V20.0604C11.723 20.0246 11.5511 19.9732 11.3848 19.9068L4.47524 17.1432C4.36401 17.0986 4.26868 17.0218 4.20153 16.9225C4.13437 16.8233 4.09847 16.7062 4.09844 16.5864V7.4856L11.8984 10.6044Z"
                            fill="#FFA500"
                          />
                        </svg>
                      </span>
                      На попуст
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end px-3">
            <img
              src={require("../../assets/images/tehnomarket-paper.png")}
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div
          id="sectionPrice"
          className="container-fluid px-5 bg-light py-5 ml-0"
        >
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex justify-content-center justify-content-lg-start pb-5">
                <a className="atag" href="#sectionPrice">
                  <h5>цени</h5>
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex justify-content-center justify-content-lg-start pb-5">
                <a className="atag" href="#sectionViews">
                  <h5 className="">прегледи</h5>
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex justify-content-center justify-content-lg-start pb-5">
                <a className="atag" href="#statistic">
                  <h5 className="">статистики</h5>
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-3 zindex">
              <div className="d-flex justify-content-center justify-content-lg-start pb-5">
                <a className="atag" href="#aboutProduct">
                  <h5>ифнормаии за продуктот</h5>
                </a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border border-radius box-shadow ad-color">
            <div className="d-flex">
              <div className="bg-orange border-radius-left py-4">
                <h2 className="m-0 p-1 text-white">AD</h2>
              </div>
              <div className="d-flex justify-content-center flex-column ml-3">
                <h4 className="m-0 ">Нептун</h4>
                <a href="#">http://localhost:3000</a>
              </div>
            </div>
            <div className="d-flex justify-content-center pr-3 price-text-color">
              <p className="mb-0 mr-3">{product?.price} ден</p>
              <p className="mb-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                    fill="#FFA500"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end border border-radius bg-white mt-5 py-5 px-3 box-shadow">
            <div className="d-flex">
              <div className="d-flex justify-content-center flex-column ml-3">
                <div>
                  <img src={require("../../assets/images/merkur.png")} alt="" />
                </div>
                <a className="mt-3" href="#">
                  http://localhost:3000
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center pr-3 price-text-color">
              <p className="mb-0 mr-3">{product?.price} ден</p>
              <p className="mb-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                    fill="#FFA500"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end border border-radius bg-white mt-5 py-5 px-3 box-shadow">
            <div className="d-flex">
              <div className="d-flex justify-content-center flex-column ml-3">
                <div>
                  <img src={require("../../assets/images/neptun.png")} alt="" />
                </div>
                <a className="mt-3" href="#">
                  http://localhost:3000
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center pr-3 price-text-color">
              <p className="mb-0 mr-3">{product?.price} ден</p>
              <p className="mb-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                    fill="#FFA500"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end border border-radius bg-white mt-5 py-5 px-3 box-shadow">
            <div className="d-flex">
              <div className="d-flex justify-content-center flex-column ml-3">
                <div>
                  <img
                    src={require("../../assets/images/tehnomarket.png")}
                    className="w-10"
                    alt=""
                  />
                </div>
                <a className="mt-3" href="#">
                  http://localhost:3000
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center pr-3 price-text-color">
              <p className="mb-0 mr-3">{product?.price} ден</p>
              <p className="mb-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                    fill="#FFA500"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end border border-radius bg-white mt-5 py-5 px-3 box-shadow">
            <div className="d-flex">
              <div className="d-flex justify-content-center flex-column ml-3">
                <div>
                  <img src={require("../../assets/images/anhoch.png")} alt="" />
                </div>
                <a className="mt-3" href="#">
                  http://localhost:3000
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center pr-3 price-text-color">
              <p className="mb-0 mr-3">{product?.price} ден</p>
              <p className="mb-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                    fill="#FFA500"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="setec d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end">
            <img src={require("../../assets/images/setec-paper.png")} alt="" />
          </div>
          <div className="tehnomarket d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end">
            <img
              src={require("../../assets/images/tehnomarket-paper.png")}
              alt=""
            />
          </div>
          <div className="setec2 d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end">
            <img src={require("../../assets/images/setec-paper.png")} alt="" />
          </div>
          <div className="tehnomarket2 d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end">
            <img
              src={require("../../assets/images/tehnomarket-paper.png")}
              alt=""
            />
          </div>
          <div className="setec3 d-none d-lg-block col-lg-5 mt-lg-0 mt-3 text-end">
            <img src={require("../../assets/images/setec-paper.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="container-fluid p-5">
        <h1>Слични продукти</h1>
      </div>
      <div className="container-fluid p-3 p-md-5 bg-light">
        <div className="row simular-products">
          {filterCloseProducts?.map((card: Product) => (
            <div
              key={`${card.id} - key`}
              className="col-12 col-md-4 col-lg-3 mb-3"
            >
              <ProductCard
                name={card.name}
                image={card.image}
                price={card.price}
                rating={card.rating}
                discount={card.discount}
                id={card.id}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        id="sectionViews"
        className="container-fluid d-block d-md-flex justify-content-between align-items-start"
      >
        <div className="container-fluid p-5">
          <h1>Рецензии</h1>
          <p>Погледни што мислат другите корисници</p>
          <h1 className="mt-5">
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0215 8.93522L16.849 12.4784L18.0989 17.7535C18.165 18.0292 18.1461 18.3179 18.0446 18.5832C17.9431 18.8486 17.7634 19.079 17.528 19.2456C17.2927 19.4121 17.0121 19.5075 16.7213 19.5197C16.4305 19.532 16.1425 19.4606 15.8933 19.3144L11.1647 16.5238L6.44628 19.3144C6.19701 19.4606 5.90899 19.532 5.61822 19.5197C5.32746 19.5075 5.04685 19.4121 4.81149 19.2456C4.57612 19.079 4.39645 18.8486 4.29492 18.5832C4.19339 18.3179 4.17452 18.0292 4.24066 17.7535L5.48872 12.4838L1.31525 8.93522C1.09451 8.74998 0.934895 8.50546 0.856416 8.23231C0.777936 7.95915 0.784089 7.66954 0.874101 7.39978C0.964114 7.13001 1.13398 6.89211 1.3624 6.71591C1.59081 6.53971 1.86761 6.43304 2.15809 6.40929L7.65918 5.94569L9.80652 0.962251C9.91865 0.700761 10.1078 0.477398 10.3501 0.320288C10.5925 0.163179 10.8772 0.0793457 11.1684 0.0793457C11.4596 0.0793457 11.7443 0.163179 11.9866 0.320288C12.229 0.477398 12.4181 0.700761 12.5302 0.962251L14.684 5.94569L20.1833 6.40929C20.4738 6.43304 20.7506 6.53971 20.979 6.71591C21.2074 6.89211 21.3773 7.13001 21.4673 7.39978C21.5573 7.66954 21.5634 7.95915 21.485 8.23231C21.4065 8.50546 21.2469 8.74998 21.0261 8.93522H21.0215Z"
                  fill="#FFA500"
                />
              </svg>
            </span>{" "}
            <b>
              {Math.round((totalRating / reviews.length) * 10) / 10 ||
                "No Reviews"}
            </b>
          </h1>
          <p>
            од <b>{reviews.length} одговори</b>
          </p>
          <ul className="type pl-0">
            <li className="w-50">
              <span className="position-absolute">5</span>
              <div className="progress ml-4">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${fiveStarsPercentage}%` }} // Adjust width here
                ></div>
              </div>
            </li>
            <li className="w-50">
              <span className="position-absolute">4</span>
              <div className="progress ml-4 mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${fourStarsPercentage}%` }} // Adjust width here
                ></div>
              </div>
            </li>
            <li className="w-50">
              <span className="position-absolute">3</span>
              <div className="progress ml-4 mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${threeStarsPercentage}%` }} // Adjust width here
                ></div>
              </div>
            </li>
            <li className="w-50">
              <span className="position-absolute">2</span>
              <div className="progress ml-4 mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${twoStarsPercentage}%` }} // Adjust width here
                ></div>
              </div>
            </li>
            <li className="w-50">
              <span className="position-absolute">1</span>
              <div className="progress ml-4 mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${oneStarsPercentage}%` }} // Adjust width here
                ></div>
              </div>
            </li>
          </ul>
          <button className="mt-3 comment-btn" onClick={handleOpenModal}>
            +Коментар
          </button>
        </div>
        <div className="container-fluid d-flex flex-column py-5">
          {reviews.length >= 0 &&
            pagination &&
            reviews.slice(0, 2).map((item, index) => {
              return (
                <div
                  key={`${index} - review`}
                  className="container-fluid d-flex flex-column mt-5"
                >
                  <div className="d-flex justify-content-between align-items-end">
                    <div className="d-flex justify-content-start align-items-start">
                      <div className="userlogo">
                        <img
                          src={require(`../../assets/images/${item.img}`)}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <h2 className="mb-0 ml-3">{item.name}</h2>
                    </div>
                    {RatingDisplay(item.rating)}
                  </div>

                  <p className="mt-3">{item.comment}</p>
                </div>
              );
            })}
          {reviews.length >= 0 &&
            !pagination &&
            reviews.map((item, index) => {
              return (
                <div
                  key={`${index} - review`}
                  className="container-fluid d-flex flex-column mt-5"
                >
                  <div className="d-flex justify-content-between align-items-end">
                    <div className="d-flex justify-content-start align-items-start">
                      <div className="userlogo">
                        <img
                          src={require(`../../assets/images/${item.img}`)}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <h2 className="mb-0 ml-3">{item.name}</h2>
                    </div>
                    {RatingDisplay(item.rating)}
                  </div>

                  <p className="mt-3">{item.comment}</p>
                </div>
              );
            })}
          {pagination === true ? (
            <h5 className="text-end cursor-pointer" onClick={onClickPagination}>
              Види ги сите
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                  fill="black"
                />
              </svg>
            </h5>
          ) : (
            <h5 className="text-end cursor-pointer" onClick={onClickPagination}>
              Сокри
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.26181 2.86296C8.93374 3.19114 8.74944 3.63617 8.74944 4.10021C8.74944 4.56425 8.93374 5.00929 9.26181 5.33746L17.9243 14L9.26181 22.6625C8.94303 22.9925 8.76664 23.4346 8.77063 23.8934C8.77462 24.3523 8.95866 24.7912 9.28313 25.1156C9.60759 25.4401 10.0465 25.6242 10.5054 25.6281C10.9642 25.6321 11.4063 25.4557 11.7363 25.137L21.6361 15.2372C21.9641 14.909 22.1484 14.464 22.1484 14C22.1484 13.5359 21.9641 13.0909 21.6361 12.7627L11.7363 2.86296C11.4081 2.53489 10.9631 2.35059 10.4991 2.35059C10.035 2.35059 9.58998 2.53489 9.26181 2.86296Z"
                  fill="black"
                />
              </svg>
            </h5>
          )}
        </div>
      </div>

      {/* modal */}
      <div
        className="modal"
        tabIndex={-1}
        style={{ display: modalVisible ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close position-absolute end-0 top-0 mr-3"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalVisible(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <form onSubmit={onSubmitReview} className="form-container">
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-12 col-form-label">
                    Име
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      name="name"
                      onChange={(e: any) => onChangeValue(e)}
                      value={addReview.name}
                      id="name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="comment" className="col-sm-12 col-form-label">
                    Коментар
                  </label>
                  <div className="col-sm-12">
                    <textarea
                      id="comment"
                      className="form-control"
                      rows={3}
                      name="comment"
                      onChange={(e: any) => onChangeValue(e)}
                      value={addReview.comment}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="rating" className="col-sm-12 col-form-label">
                    Rating
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="range"
                      id="rating"
                      className="form-control-range"
                      max={5}
                      name="rating"
                      onChange={(e: any) => onChangeValue(e)}
                      value={addReview.rating}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="statistic" className="py-5 my-5">
        <Overview />
      </div>
      <div id="aboutProduct" className="my-5 py-5 container-fluid px-5">
        <div className="py-5 mt-5">
          <h1>Информации за Продуктот</h1>
          <h5>
            Најниската цена за Nutribullet Pro е 3000ден. Ова е најдобрата цена
            во моментов меѓу 4 продавници.
          </h5>
        </div>
        <p>
          Блендерот е очигледен избор на кујнска машина. Честиот кој пие смути
          ќе сфати дека е многу полесно да експериментира со состојки и вкусови
          со навистина добар блендер. Уморни од мешање тесто за палачинки со
          рака? Само фрлете ги сите состојки во блендерот и седнете додека тој
          работи за вас. Затоа можете да уживате во блендер во вашата кујна!
        </p>
        <ul className="py-5">
          <li>
            <b>Острилв нож</b>
          </li>
          <li>
            <b>Мотор од 900 вати</b>
          </li>
          <li>
            <b>Две програми</b>
          </li>
        </ul>
        <p>
          За да биде мешањето уште поефикасно, овој блендер има нож со четири
          сечила. Деловите од блендерот може да се мијат во машина за миење
          садови, така што не е потребно време од вадењето на блендерот до
          уживањето во вашето смути во мир и тишина. Има висока просечна оцена
          од 4,3/5, што го прави еден од најдобрите блендери на PriceRunner. Во
          моментов најниската цена за овој блендер е 3000 денари, но слободно
          споредете ја цената помеѓу различни трговци.
        </p>
      </div>
    </>
  );
}

export default ProductPage;
