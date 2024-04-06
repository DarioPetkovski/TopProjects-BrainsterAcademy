import { Link } from "react-router-dom"
import { Artist } from "../ArtistListInterface"

function ArtistItem(item:Artist) {
  return (
    <Link to={`artist/${item.id}`}>
    <div className="item px-3">
        <div className="wrapper position-relative">
            <img src={`images/covers/${item.cover}.jpg`} alt="" className="w-100 mb-3"/>
            <button className="btn btn-primary position-absolute linkBtn mb-3">{item.name}</button>
        </div>
    </div>
    </Link>
  )
}

export default ArtistItem