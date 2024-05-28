import Link from "next/link";
import { Movie } from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";

function Banner() {
  const { data } = useGlobalContext();
  const movies = data.movies.filter((item) => item.type === "Movies");
  const sortByImdbRating = movies
    .sort((a: Movie, b: Movie) => {
      return b.imdb - a.imdb;
    })
    .slice(0, 7);
  return (
    <div className="w-100 banner">
      <div className="container">
        <div className="logo px-5">
          <img src="/assets/images/kinemoeLogo.png" alt="" />
        </div>
        <div className="banner-content text-white text-center">
          <h1>EXPLORE, ENGAGE & EXPRESS YOURSELF</h1>
          <h4>Watch, learn, collaborate beyond the screen</h4>
          <Link href={"/login"}>
            <button className="signin-btn">Sign up/Sign in</button>
          </Link>
        </div>
      </div>
      <div className="container-fluid px-0 banner-images justify-content-between d-flex align-items-end mt-5">
        {sortByImdbRating.map((item, index) => {
          return (
            <div
              key={`sorted-${item.id}`}
              className={`img-${index + 1} position-relative`}
            >
              <img className="w-100 h-100" src={item.img} alt="" />
              <div className="position-absolute badge-con">
                <span className=" badge-imdb">imdb</span>
                <span className=" badge-rating">
                  {item.imdb}
                  <span className="text-white out-of">/10</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Banner;
