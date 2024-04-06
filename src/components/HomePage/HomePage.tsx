import PopularRestaurants from "../PopularRestoraunts/PopularRestaurants";
import Cuisines from "../Cuisines/Cuisines";
import SurpriseRestaurant from "../SurpriseRestaurant/SurpriseRestaurant";
import AllRestaurants from "../AllRestaurants/AllRestaurants";
import { useGlobalContext } from "../../context/GlobalContext";
import { loading } from "../ServiceFunctions/ServiceFunctions";

function HomePage() {
    const { data, err } = useGlobalContext();
    const loadingComponent = loading(data)
    if (err) {
        return (
            <div className="text-center">
                <h2>Error 404</h2>
                <h4>Server Not Found</h4>
            </div>
        );
    }
    return (
        <>
           {loadingComponent}
            {!loadingComponent && 
                <>
                    <SurpriseRestaurant />
                    <PopularRestaurants />
                    <Cuisines />
                    <AllRestaurants />
                </>
            }
        </>
    );
}

export default HomePage;