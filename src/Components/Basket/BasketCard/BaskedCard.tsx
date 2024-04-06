import { Product } from "../../../assets/data/list"

function BaskedCard(data:Product) {
  return (
    <div className="col-4" style={{ width: "18rem" }}>
      <div className="card mt-4">
      <img className="card-img-top" src={`/images/${data.img}`} alt="Card image cap"></img>
  <div className="card-body">
    <p className="card-text">{data.name}</p>
    <p className="card-text mb-0"><span>{data.price} den</span></p>
    <p className="card-text">{data.amount} {data.text?.split(" ")[2]}</p>
      </div>
  </div>
</div>
  )
}

export default BaskedCard