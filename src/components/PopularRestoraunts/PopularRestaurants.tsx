import { useGlobalContext } from "../../context/GlobalContext";
import { renderCards, sortRestaurantsByRating } from "../ServiceFunctions/ServiceFunctions";
function PopularRestaurants() {
    const { data } = useGlobalContext();
    const sortedData = sortRestaurantsByRating(data)
  return (
    <>
    <h3 className="text-center mt-4">OUR MOST POPULAR RESTORAUNTS</h3>
    <div className="card-container d-flex justify-content-left flex-wrap">
    {renderCards(sortedData.slice(0, 10), "pop","wrapper")}
    </div>
    </>
  )
}

export default PopularRestaurants