import { useState } from "react"
import { Product } from "../../assets/data/list"

interface Props {
  data:Product
  addToBasket:(item:Product) => void
}

function ProductComponent({data,addToBasket}:Props) {
  const [amount,setAmount] = useState<number>(1)
  

  const onClickAddHandler = () => {
    const newItem:Product = {id: data.id,
      name: data.name,
      img: data.img,
      price: data.price * amount,
      amount: amount,
      text: data.text,
      selected: true}
      setAmount(1)
      addToBasket(newItem)
  }

  const onClickPlusHandler = ()=>{
    setAmount(prev => prev + 1)
  }
  const onClickMinussHandler = ()=>{
    if(amount < 2){
      setAmount(1)
    }
    else{
      setAmount(prev => prev - 1)
    }
  }
  return (
    <>
    <div className="col-4" style={{ width: "18rem" }}>
      <div className="card mt-4">
      <img className="card-img-top" src={`/images/${data.img}`} alt="Card image cap"></img>
  <div className="card-body">
    <p className="card-text">{data.name}</p>
    <p className="card-text"><span>{data.price}</span> <span>{data.text}</span></p>
    <button className=" btn btn-success" onClick={onClickPlusHandler}>+</button>
    <button className="btn btn-danger ml-5" onClick={onClickMinussHandler}>-</button>
    <p>Amount: {amount}</p>
    <button className="btn btn-primary" onClick={onClickAddHandler}>Add in Basket</button>
      </div>
  </div>
</div>
    </>
  )
}

export default ProductComponent