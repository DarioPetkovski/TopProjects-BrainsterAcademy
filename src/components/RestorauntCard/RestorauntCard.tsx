import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Restoraunt } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";


function RestaurantCard(restaurant:Restoraunt) {
    const { favorites, setFavorites} = useGlobalContext();
    const [active, setActive] = useState<boolean>();

    useEffect(() => {
        setActive(favorites.some(favorite => favorite.id === restaurant.id));
    }, [favorites, restaurant.id]);

    const toggleFavorite = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (active) {
            setFavorites(prev => prev.filter(favorite => favorite.id !== restaurant.id));
        } else {
            setFavorites(prev => [...prev, restaurant]);
        }
    };

    return (
        <Link className="link" to={`/restaurantdetails/${restaurant.id}`}>
        <div className="card">
            <div className="img-con">
                <img src={restaurant.image} alt="" className="w-100" />
                <i onClick={toggleFavorite} className={`${active ? "fa-solid" : "fa-regular"} fa-heart text-danger`}></i>
            </div>
            <div className="content-wrapper">
                <h5 className="mb-0">{restaurant.businessname}</h5>
                <h6>{restaurant.restauranttype}</h6>
                <Rating {...restaurant}/>
            </div>
        </div>
        </Link>
    );
}

export default RestaurantCard;