import "./Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <Link to="/"><div className="header position-relative px-0 col-4">
    <h2 className="position-absolute text-white content">MUSIC DB</h2>
    <img src="/images/raw/Girls-Listen-Music_0.jpg" className="w-100 d-block" alt="" />
</div></Link>
  )
}

export default Navbar