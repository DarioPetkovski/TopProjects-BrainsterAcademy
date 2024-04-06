import { useState } from "react";
import { Product } from "../../data/products";
import "./OrderTable.css";

function OrderTable({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [show, setShow] = useState(false);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(
      (product) => product.name === event.target.value
    );
    setSelectedProduct(selectedProduct);
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const onClickHandler = () => {
    if (selectedProduct && quantity > 0) {
      const newOrderItem = {
        product: selectedProduct,
        quantity: quantity,
      };
      setOrderItems((prevItems) => [...prevItems, newOrderItem]);
      setSelectedProduct(undefined);
      setQuantity(0);
    }
  };

  const onClickShow = () => {
    setShow(true);
  };
  const onClickHide = () => {
    setShow(false);
    setSelectedProduct(undefined);
    setQuantity(0);
    setOrderItems([]);
    setShow(false);
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={onClickShow}>
        Generate Order
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Unit</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {orderItems.map((item, index) => (
           <tr key={index}>
             <th>{index + 1}</th>
             <td>{item.product.name}</td>
             <td>{item.product.description}</td>
             <td>{item.product.unit}</td>
             <td>{item.quantity}</td>
           </tr>
         ))}
          <tr>
            <th>{orderItems.length + 1}</th>
            <td>
              <select
                className="custom-select"
                id="product"
                onChange={handleProductChange}
                value={selectedProduct?.name || ""}
              >
                <option disabled value="">
                  Select Product
                </option>
                {products.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </td>
            <td>{selectedProduct?.description}</td>
            <td>{selectedProduct?.unit}</td>
            <td>
              <input
                onChange={onChangeValue}
                type="number"
                className="form-control"
                min={1}
                value={quantity || ""}
              />
            </td>
            <td>
              <button
                disabled={quantity === 0}
                className="btn btn-success"
                onClick={onClickHandler}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {show && (
  <div className="containerr">
    <p>Ordered Ingredients</p>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Unit</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((item, orderIndex) =>
          item.product.ingredients.map((ingredient, ingredientIndex) => {
            const existingIngredientIndex = orderItems
              .slice(0, orderIndex)
              .findIndex((prevItem) =>
                prevItem.product.ingredients.some(
                  (prevIngredient) => prevIngredient.name === ingredient.name
                )
              );

            if (existingIngredientIndex !== -1) return null;

            const aggregatedQuantity = orderItems.reduce((total, currentItem, currentIndex) => {
              if (currentIndex >= orderIndex && currentItem.product.ingredients.some(
                (currIngredient) => currIngredient.name === ingredient.name
              )) {
                return total + currentItem.quantity;
              }
              return total;
            }, 0);

            return (
              <tr key={`${orderIndex}-${ingredientIndex}`}>
                <th scope="row">{ingredientIndex}</th>
                <td>{ingredient.name}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.amount * aggregatedQuantity}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={onClickHide}>Place the order</button>
  </div>
)}
    </div>
  );
}

export default OrderTable;