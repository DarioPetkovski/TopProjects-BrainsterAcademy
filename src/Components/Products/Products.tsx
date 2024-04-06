import { useEffect, useState } from "react"
import productList, { Product } from "../../assets/data/list"
import ProductComponent from "../Product/ProductComponent"
import Nav from "../Nav/Nav";

interface ProductsProps {
  basketItems: Product[];
  setBasketItems: React.Dispatch<React.SetStateAction<Product[]>>;
}
function Products({basketItems,setBasketItems}:ProductsProps) {
    const [data,setData] = useState<Product[]>([])

    const addToBasket = (item: Product) => {
      const itemIndex = basketItems.findIndex(el => el.id === item.id);
  
      if (itemIndex !== -1) {
        setBasketItems(prev => {
          const updatedBasket = [...prev];
          updatedBasket[itemIndex] = {
            ...updatedBasket[itemIndex],
            amount: updatedBasket[itemIndex].amount + item.amount,
            price: updatedBasket[itemIndex].price + item.price
          };
          return updatedBasket;
        });
      } 
      else {
        setBasketItems(prev => [...prev,item]);
      }
    };
  
    useEffect(()=>{
        setData(productList)
        console.log(basketItems)
    },[basketItems])
  return (<>
  <Nav basketItems={basketItems}/>
    <div className="container">
        <div className="row">
          {data.map((item,index) => {
            return <ProductComponent key={index} data={item} addToBasket={addToBasket}/>
        })}
        </div>
    </div>
    </>
  )
}

export default Products

        