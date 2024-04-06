import "./Navbar.css"

interface NavbarProps {
  show: () => void;
  hide: () => void;
}

function Navbar({ show ,hide}: NavbarProps) {
  return (
    <div className="container bg-info text-white d-flex align-items-center justify-content-left nav">
      <p className="mb-0 ml-5 pointer" onClick={show}>Products</p>
      <p className="ml-5 mb-0 pointer" onClick={hide}>Order</p>
    </div>
  )
}

export default Navbar