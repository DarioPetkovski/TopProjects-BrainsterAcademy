import { Link } from "react-router-dom"
function Navbar() {
  return (
    <div className="Navbar py-4 d-flex justify-content-between align-items-center">
        <Link className="link" to="/"><h5 className="mb-0">RESTORAUNT</h5></Link>
        <Link className="link" to="/favorites"><i className="fa-solid fa-heart text-danger"></i></Link>
    </div>
  )
}

export default Navbar