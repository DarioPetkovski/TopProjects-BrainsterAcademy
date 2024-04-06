import { Link } from "react-router-dom"
import { Product } from "../../assets/data/list"

function Nav({basketItems}:{basketItems:Product[]}) {
  return (
    <nav className='container-fluid py-3 px-5 d-flex justify-content-between align-items-center bg-info w-100'>
        <h3><Link className='text-white' to={"/"}>Products</Link></h3>
        <div className='basketCon'>
        <Link className='text-white' to={"/basket"}><i className="fa-solid fa-cart-shopping"></i></Link>
        {basketItems.length === 0 ? <span></span> : <span className="badge badge-danger">{basketItems.length}</span>}
        </div>
      </nav>
  )
}

export default Nav