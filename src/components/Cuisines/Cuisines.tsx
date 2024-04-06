import { Link } from "react-router-dom"

function Cuisines() {
  return (
            <div className="cuisine text-center py-4 mt-5">
                <h3>CUISINES</h3>
                <div className="button-Container mt-4 pb-2">
                    <Link to="/cuisinedetail/canteen"><button className="cuisine-btn">canteen</button></Link>
                    <Link to="/cuisinedetail/bukka" ><button className="cuisine-btn">bukka</button></Link>
                    <Link to="/cuisinedetail/eatery"><button className="cuisine-btn">eatery</button></Link>
                    <Link to="/cuisinedetail/seafood"><button className="cuisine-btn">seafood</button></Link>
                    <Link to="/cuisinedetail/pizza"><button className="cuisine-btn">pizza</button></Link>
                    <Link to="/cuisinedetail/vegan"><button className="cuisine-btn">vegan</button></Link>
                    <Link to="/cuisinedetail/pasta"><button className="cuisine-btn">pasta</button></Link>
                    <Link to="/cuisinedetail/american"><button className="cuisine-btn">american</button></Link>
                    <Link to="/cuisinedetail/japanese"><button className="cuisine-btn">japanese</button></Link>
                </div>
            </div>
  )
}

export default Cuisines