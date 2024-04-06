import { DataType } from "../DataType"

function Card(cardObj:DataType) {
  return (
    <div className="wrapper col-4 mb-3 mt-3 pl-5">
            <div className="card px-0">
            <div className="card-img p-4">
          <img src={`/img/${cardObj.image}.png`} alt="" className="w-100" />
          </div>
          <div className="card-content bg-warning px-3 py-2">
              <p className="mb-0 font-weight font-size">{cardObj.name}</p>
              <p className="mb-0">{cardObj.price} $</p>
          </div>
            </div>
          </div>
  )
}

export default Card