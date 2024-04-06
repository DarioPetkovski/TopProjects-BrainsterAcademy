import { Product } from "../../data/products"
import TableRow from "./TableRow/TableRow"

function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="container mt-5">
        <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Unit</th>
      <th scope="col">Ingridiants</th>
    </tr>
  </thead>
  <tbody>
    {products.map(item => {
        return <TableRow {...item}/>
    })}
  </tbody>
</table>
    </div>
  )
}

export default ProductTable