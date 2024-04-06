import { useParams } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { review } from "../../interfaces/interfaces";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import DetailCard from "../DetailCard/DetailCard";

function RestaurantDetail() {
    const {data} = useGlobalContext()
    const { id } = useParams<{ id: string }>();
    const restaurant = data.find(restaurant => restaurant.id === id)
    const [reviewArr, setReviewArr] = useState<review[]>([]);

    useEffect(() => {
        if (restaurant) {
            setReviewArr(restaurant.reviewsList);
        }
    }, [restaurant]);
    if (!data || data.length === 0) {
        return <div className="text-center"><h3>Loading...</h3></div>;
    }

  return (
    <div className="restaurant-detail d-flex flex-column justify-content-center align-items-center">
        {restaurant ? <>
            <h3 className="my-4">{restaurant?.businessname.toLocaleUpperCase()}</h3>
            <div className="detail-container">
                <DetailCard {...restaurant}/>
                <Reviews reviewArr={reviewArr}/>
                <ReviewForm {...restaurant}/>
            </div>
        </>:<><h2>Error 404</h2><h4>Invalid Restaurant</h4></>}
    </div>
  )
}

export default RestaurantDetail