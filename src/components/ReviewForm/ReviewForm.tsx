import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Restoraunt, review } from "../../interfaces/interfaces";

function ReviewForm(restaurant:Restoraunt) {
    const {setFavorites,setData} = useGlobalContext()
    const [newReview , setNewReview] = useState<review>({
        id: restaurant?.reviewsList.length,
        author:"",
        comment:"",
        stars: 0
    })
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = name === 'stars' ? parseInt(value) : value;
        setNewReview(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!restaurant) {
            console.log("Restaurant is undefined");
            return;
        }

        const updatedReviewList = [...restaurant.reviewsList, newReview];
        const updatedRestaurant: Restoraunt = {
            ...restaurant,
            reviews: updatedReviewList.length,
            reviewsList: updatedReviewList
        };

        setFavorites((prevFavorites: Restoraunt[]) => {
            return prevFavorites.map((favorite: Restoraunt) => {
                if (favorite.id === restaurant.id) {
                    return updatedRestaurant
                }
                else{
                    return favorite;
                }
                
            });
        });
        
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === updatedRestaurant.id) {
                    return updatedRestaurant;
                } 
                else {
                    return item;
                }
            });
        });

        fetch(`http://localhost:5001/restaurants/${restaurant.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRestaurant)
        });

        setNewReview({
            id: updatedReviewList.length,
            author: "",
            comment: "",
            stars: 0
        });
    };
    const disabled = newReview.author === "" || newReview.comment === "" || newReview.stars === 0;
  return (
    <form onSubmit={onSubmitHandler} className="bg-white">
                <h3 className="text-center py-3 mb-0">REVIEW FORM</h3>
                <div className="d-flex justify-content-center flex-column align-items-left">
                    <label htmlFor="name">Name</label>
                    <input onChange={onChangeHandler} type="text" name="author" value={newReview.author} id="name" className="w-100 input"/>
                </div>
                <div className="d-flex justify-content-center flex-column align-items-left mt-3">
                    <label htmlFor="comment">Comment</label>
                    <input onChange={onChangeHandler} type="text" name="comment" value={newReview.comment} id="comment" className="w-100 input"/>
                </div>
                <div className="d-flex justify-content-center flex-column align-items-left mt-3">
                <label htmlFor="stars">Stars</label>
                <input onChange={onChangeHandler} type="range" name="stars" value={newReview.stars} min="0" max="5" id="stars"/>
                </div>
                <button type="submit" className={`button mt-3 ${disabled ? 'button-disabled' : ''}`} disabled={disabled}>Leave a review</button>
            </form>
  )
}

export default ReviewForm