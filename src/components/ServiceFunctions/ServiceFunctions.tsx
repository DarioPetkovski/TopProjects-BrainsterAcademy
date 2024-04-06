import { Restoraunt } from "../../interfaces/interfaces";
import RestorauntCard from "../RestorauntCard/RestorauntCard";

export const renderCards = (data: Restoraunt[], key: string, wrapper:string) => {
    return data.map((item, index) => {
        return (
            <div className={`${wrapper} mt-3`} key={`${index}-${key}`}>
                <RestorauntCard {...item} />
            </div>
        );
    });
};

export const loading = (data:Restoraunt[]) => {
    if (!data || data.length === 0) {
        return <div className="text-center"><h3>Loading...</h3></div>;
    }
}

export const calculateRating = (restaurant: Restoraunt) => {
    let totalStars = 0;
    let reviewCount = 0;
        restaurant.reviewsList.forEach(review => {
            if (review.stars) {
                totalStars += review.stars;
                reviewCount++;
            }
        });

    return reviewCount === 0 ? 0 : totalStars / reviewCount;

};

export const sortRestaurantsByRating = (data: Restoraunt[]) => {
    return [...data].sort((firstRestaurant, secondRestaurant) => {
        const ratingFirstRestaurant = calculateRating(firstRestaurant);
        const ratingSecondRestaurant = calculateRating(secondRestaurant);
        
        return ratingSecondRestaurant - ratingFirstRestaurant;
    });
};

export const restaurantRating = (restaurant:Restoraunt) =>{
    const reviews = restaurant?.reviews || 0
    let totalStars = 0;
    let starsCount = 0;

    restaurant?.reviewsList.forEach(review => {
        if (review.stars) {
            totalStars += review.stars;
            starsCount++;
        }
    });
    return {reviews,totalStars,starsCount}
}