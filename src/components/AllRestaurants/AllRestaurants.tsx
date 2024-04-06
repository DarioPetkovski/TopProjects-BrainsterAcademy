import { useGlobalContext } from '../../context/GlobalContext'
import { renderCards } from '../ServiceFunctions/ServiceFunctions'

function AllRestaurants() {
    const {data} = useGlobalContext()
  return (
    <>
    <h3 className="text-center mt-4">ALL RESTAURANTS</h3>
            <div className="card-container d-flex justify-content-left flex-wrap">
                {renderCards(data,"all","wrapper")}
            </div>
    </>
  )
}

export default AllRestaurants