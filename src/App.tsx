import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './Components/Products/Products';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Basket from './Components/Basket/Basket';
import { useState } from 'react';
import { Product } from './assets/data/list';
import ErrorPage from './Components/ErrorPage/ErrorPage';

export const App = () => {
  const [basketItems, setBasketItems] = useState<Product[]>([]);

  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
         <Route path='/' element = {<Products basketItems={basketItems} setBasketItems = {setBasketItems}/>}/>
         <Route path='/basket' element = {<Basket basketAddItems={basketItems} setBasketAddItems={setBasketItems}/>}/>
         <Route path='*' element = {<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
};
