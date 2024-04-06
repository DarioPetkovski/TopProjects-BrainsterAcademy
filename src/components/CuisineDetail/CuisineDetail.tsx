import { useParams } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext"
import { loading, renderCards } from "../ServiceFunctions/ServiceFunctions"

function CuisineDetail() {
    const { data } = useGlobalContext()
    const { restaurantType } = useParams<{ restaurantType: string }>()
    const filterRestaurant = data.filter(item => item.restauranttype === restaurantType)
    const loadingComponent = loading(data);
    return (
        <>
            {loadingComponent && loadingComponent}
            {filterRestaurant.length > 0 ? 
                <>
                    <h3 className="text-center mt-4 mb-0">{`${restaurantType?.toUpperCase()} RESTAURANTS`}</h3>
                    <div className="card-container d-flex justify-content-left flex-wrap mt-4">
                        {renderCards(filterRestaurant,"cuisine","wrapper")}
                    </div>
                </>
             : 
                <div className="text-center">
                    <h2>No Restaurants Found</h2>
                    <h4>There are no restaurants of type {restaurantType}</h4>
                </div>
            }
        </>
    )
}

export default CuisineDetail