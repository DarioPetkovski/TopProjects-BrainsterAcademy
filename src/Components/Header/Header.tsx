import "./Header.css"

function Header() {
  return (
    <div className="container-fluid py-3 px-3 header">
        <nav className='d-flex align-items-center justify-content-between'>
            <div className='logo'>
                <img src="/img/logo.png" alt="" className='w-100' />
            </div>
            <ul className='d-flex justify-content-center align-items-center list mb-0'>
                <li><a href="#">HOME</a></li>
                <li><a href="#">BIKES</a></li>
                <li><a href="#">GEAR</a></li>
                <li><a href="#">PARTS</a></li>
                <li><a href="#">TIERS</a></li>
                <li><a href="#">SERVICE-INFO</a></li>
                <li><a href="#">CATALOGUES</a></li>
                <li><a href="#">CONTACT</a></li>
            </ul>
            <div className='icons'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-bag-shopping"></i>
            </div>
        </nav>
    </div>
  )
}

export default Header