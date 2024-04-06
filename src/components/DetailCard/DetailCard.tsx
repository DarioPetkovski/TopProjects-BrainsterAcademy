import { Restoraunt } from "../../interfaces/interfaces"
import Rating from "../Rating/Rating"

function DetailCard(restaurant:Restoraunt) {
  return (
    <div className="detail-card">
            <img src={restaurant?.image} alt="" />
               <div className="detail-content p-3">
                   <Rating {...restaurant}/>
                   <p className="mt-3">{restaurant?.phone}</p>
                   <p>{restaurant?.email}</p>
                   <p>{restaurant?.address}</p>
                   <p>{restaurant?.parkinglot ? "We have parking lot waiting for you":""}</p>
               </div>
            </div>
  )
}

export default DetailCard