import { Product } from "../../assets/data/list"
import Nav from "../Nav/Nav"
import BaskedCard from "./BasketCard/BaskedCard"

interface BasketProps {
    basketAddItems:Product[]
    setBasketAddItems: React.Dispatch<React.SetStateAction<Product[]>>
}

function Basket({basketAddItems,setBasketAddItems}:BasketProps) {

    const onClickOrder =() => {
        setBasketAddItems([])
    }
  return (<>
  <Nav basketItems={basketAddItems}/>
    <div className="container">
        {basketAddItems.length === 0 ? <h1 className="mt-5">Empty Basket</h1> : <button onClick={onClickOrder} className="btn btn-primary mt-4">Order</button>}
        <div className="row">
          {basketAddItems.map((item,index) => {
            return <BaskedCard key={index} {...item}/>
        })}
        </div>
    </div>
    </>
  )
}

export default Basket