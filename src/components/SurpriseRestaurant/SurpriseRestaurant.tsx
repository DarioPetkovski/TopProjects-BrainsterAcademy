import { Link } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext";

function SurpriseRestaurant() {
    const { data } = useGlobalContext();
    const randomRestaurantIndex = Math.floor(Math.random() * data.length);
    const randomRestaurantID = data[randomRestaurantIndex].id;

    return (
        <div className="mt-4 text-center surprise pb-5">
            <h3>DON'T KNOW WHAT TO EAT</h3>
            <Link to={`/restaurantdetails/${randomRestaurantID}`}>
                <button className="button py-1">Surprise me!</button>
            </Link>
        </div>
    );
}

export default SurpriseRestaurant;