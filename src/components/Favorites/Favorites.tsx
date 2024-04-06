import { useGlobalContext } from "../../context/GlobalContext"
import { renderCards } from "../ServiceFunctions/ServiceFunctions"

function Favorites() {
    const {favorites} = useGlobalContext()
  return (
    <div className="favoritesPage text-center mt-4">
        <h3>YOUR FAVORITE RESTORAUNTS</h3>
        <div className="favorites-con">
            {renderCards(favorites,"fav","fav-wrapper")}
        </div>
    </div>
  )
}

export default Favorites