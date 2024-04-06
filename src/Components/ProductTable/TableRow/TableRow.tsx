import { useState } from "react"
import { Product } from "../../../data/products"
import IngridiantsTable from "./IngridiantsTable/IngridiantsTable"

function TableRow(products:Product) {
    const [show,setShow] = useState(false)
    const [content,setContent] = useState("Show Normatives")

    const onClickHandler = () => {
        setShow(prev => !prev)
        if(!show){
            setContent("Hide Normatives")
        }
        else{
            setContent("Show Normatives")
        }
    }


  return (
    <tr>
      <th scope="row">{products.id}</th>
      <td>{products.name}</td>
      <td>{products.description}</td>
      <td>{products.unit}</td>
      <td><span onClick={onClickHandler} className="pointer">{content}</span>
      {show && <IngridiantsTable ingridiants = {products.ingredients}/>}
      </td>
    </tr>
  )
}

export default TableRow