import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ProductTable from './Components/ProductTable/ProductTable';
import products from './data/products';
import OrderTable from './Components/OrderTable/OrderTable';

function App() {
const [show,setShow] = useState(true)
const onClickShowHandler = () => {
  setShow(true)
}
const onClickHideHandler = () => {
  setShow(false)
}

  return (
    <div className='App'>
      <Navbar show = {onClickShowHandler} hide = {onClickHideHandler}/>
      {show && <ProductTable products={products}/>}
      {!show && <OrderTable products={products}/>}
    </div>
  )
}

export default App;
