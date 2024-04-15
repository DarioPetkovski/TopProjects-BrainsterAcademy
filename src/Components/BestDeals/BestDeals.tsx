import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import "./BestDeals.css";
import { ProductCard } from "../ProductCard/ProducCard";
import { Product } from "../../interfaces/interfaces";
import { Favorites } from "../Favorites/Favorites";

function BestDeals() {
  const data = useGlobalContext();
  const renderCards = () => {
    return data.data?.map((card: Product) => {
      return (
        <div key={card.id} className="col-3 mb-3">
          <ProductCard
            name={card.name}
            image={card.image}
            price={card.price}
            rating={card.rating}
            discount={card.discount}
            id={card.id}
          />
        </div>
      );
    });
  };
  return (
    <div className="container-fluid p-3">
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"} className="text-decoration-none text-dark">
              Почетна
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={"/bestdeals"} className="text-decoration-none text-dark ">
              Најдобри зделки
            </Link>
          </li>
        </ol>
      </div>
      <h2 className="font-bold">Најдобри зделки</h2>
      <div className="d-flex ">
        <p
          className="text-decoration-none dropdown dropdown-toggle d-inline catalogue rounded-pill"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Филтрирање
        </p>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <ul className="dropdown-menu shadow-box">
              <div className="input-color d-flex">
                <div className=" p-3">
                  <h2 className="font-bold">Филтри</h2>
                  <br />
                  <div className="my-4">
                    <h5 className="font-bold">Попуст</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input input-color"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios1"
                      >
                        20% или повеќе
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios2"
                      >
                        10% или повеќе
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios3"
                        value="option3"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios3"
                      >
                        5% или повеќе
                      </label>
                    </div>
                  </div>
                  <div className="my-4">
                    <h5 className="font-bold">Цена</h5>

                    <input
                      type="range"
                      className="form-range input-color"
                      min="0"
                      max="5"
                      step="0.5"
                      id="customRange3"
                    />

                    <div className="d-flex justify-content-between my-3">
                      <input
                        type="number"
                        name="number"
                        id="number"
                        className="w-50 rounded mr-1 input-color"
                      />
                      <input
                        type="number"
                        name="number"
                        id="number"
                        className="w-50 rounded ml-1 input-color"
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <h5 className="font-bold">Категорија</h5>
                    <input
                      type="text"
                      className="rounded input-color mb-3"
                      placeholder="Најди категорија"
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios4"
                        value="option4"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios4"
                      >
                        Обувки
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios5"
                        value="option5"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios5"
                      >
                        Бела техника
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios6"
                        value="option6"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios6"
                      >
                        Облека
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios7"
                        value="option7"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios7"
                      >
                        За деца
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios8"
                        value="option8"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios8"
                      >
                        Фотографија
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios9"
                        value="option9"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios9"
                      >
                        Спорт
                      </label>
                    </div>
                  </div>
                  <div className="my-4">
                    <h5 className="font-bold">Бренд</h5>
                    <input
                      type="text"
                      className="rounded input-color mb-3"
                      placeholder="Најди бренд"
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios10"
                        value="option10"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios10"
                      >
                        Apple
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios11"
                        value="option11"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios11"
                      >
                        Sony
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios12"
                        value="option12"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios12"
                      >
                        Samsung
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios13"
                        value="option13"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios13"
                      >
                        Microsoft
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios14"
                        value="option14"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios14"
                      >
                        Adidas
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios15"
                        value="option15"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="exampleRadios"
                      >
                        Nike
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>

        <Link to={"/"} className="text-decoration-none">
          <p className="d-inline mr-3 catalogue rounded-pill">
            Спореди продукти
          </p>
        </Link>
        <Link to={"/"} className="text-decoration-none">
          <p className="d-inline mr-3 catalogue rounded-pill">
            Погледни ги како табела
          </p>
        </Link>
        <Link to={"/"} className="text-decoration-none">
          <p className="d-inline catalogue rounded-pill">
            Прикажи ги како мрежа
          </p>
        </Link>
      </div>

      <div className="row p-3">{renderCards()}</div>
    </div>
  );
}

export default BestDeals;
