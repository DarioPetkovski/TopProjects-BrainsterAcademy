import { Link } from "react-router-dom";
import "./Navbar.css";
import { Test } from "../../interfaces/interfaces";

function NavbarItem(props: Test) {
  return (
    <>
      <div key={props.id} className="card shadow-box flex-grow-1">
        <img
          src={require(`../../assets/images/${props.image}`)}
          alt=""
          className="props-img-top img-height"
        />
        <div className="props-body">
          <h3>{props.name}</h3>
          <p>{props.desc}</p>
          <p>{props.desc}</p>
          <Link to={"/productlisting"} className="text-decoration-none small">
            <button className="text-small text-dark mt-4 bold btn btn-link w-100 ">
              Прикажи повеќе
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarItem;
