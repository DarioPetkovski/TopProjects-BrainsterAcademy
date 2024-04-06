import { review } from "../../interfaces/interfaces";

function Reviews({reviewArr}:{reviewArr:review[]}) {
  return (
    <div className="review-container bg-white">
                {reviewArr.length > 0 ? <h3 className="text-center mb-0 py-3">REVIEWS</h3>:""}
                {reviewArr?.map((item,index) => {
                    if(reviewArr.length >= 0){
                        return <div key={`${index}-rev`} className="mt-3 review-obj">
                        <p className="mb-0"><b>Author: </b>{item.author}</p>
                        <p className="mb-0"><b>Comment: </b>{item.comment}</p>
                        <p className="mb-0"><b>Stars: </b>{item.stars}</p>
                    </div>
                    }
                })}
            </div>
  )
}

export default Reviews