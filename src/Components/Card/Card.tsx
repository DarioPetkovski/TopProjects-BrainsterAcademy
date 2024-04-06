import ReactTimeAgo from "react-time-ago"
import { CardInterface } from "../../db"


function Card(card:CardInterface) {
  return (
    <div className="col-4">
                <div className="wrapper">
                <div className="card mx-5 mt-3 p-2 ">
                <h3 className="text-center">{card.title}</h3>
                <i className="mb-2">{card.user}</i>
                <img src={card.img} alt="" />
                <p className="mt-2">{card.desc}</p>
                <i>posted about <ReactTimeAgo date={card.timePosted} locale="en-US"/>
                </i>
            </div>
           </div>
         </div>
  )
}

export default Card