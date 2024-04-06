import { Ingredient } from "../../../../data/products"

function IngridiantsTable({ingridiants}:{ingridiants:Ingredient[]}) {
  return (
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Amount</th>
        <th scope="col">Unit</th>
      </tr>
    </thead>
    <tbody>
    {ingridiants.map((item,index)=>{
        return <tr>
        <th scope="row">{index}</th>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{item.unit}</td>
      </tr>
    })}
    </tbody>
  </table>
  )
}

export default IngridiantsTable