import { Restoraunt } from "../../interfaces/interfaces";
import { restaurantRating } from "../ServiceFunctions/ServiceFunctions";

function Rating(restaurant:Restoraunt) {
    const {reviews,totalStars,starsCount} = restaurantRating(restaurant)
  return (
    <>
    {starsCount > 0 ? <p className="mb-0">rating - {Math.round((totalStars / starsCount) * 10) / 10},</p> : ""}
    {reviews > 0 ? <small>based on {reviews} reviews</small> : ""}
    </>
  )
}

export default Rating