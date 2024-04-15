import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { ProductCard } from "../ProductCard/ProducCard";
import { Product } from "../../interfaces/interfaces";
import "./CatalogPage.css";

function CatalogPage() {
  const data = useGlobalContext();
  const renderCards = () => {
    return data.data?.slice(0, 6).map((card: Product) => {
      return (
        <div key={card.id} className="col-2 mb-3">
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
      <h2 className="font-bold">Каталози</h2>
      <div className="mt-3">
        <Link to={"/"} className="text-decoration-none">
          <p className="d-inline mr-3 catalogue rounded-pill">
            Најбарани категории
          </p>
        </Link>
        <Link to={"/"} className="text-decoration-none">
          <p className="d-inline mr-3 catalogue rounded-pill">
            Препорачани категории
          </p>
        </Link>
        <Link to={"/productlisting"} className="text-decoration-none">
          <p className="d-inline catalogue rounded-pill">Сите категории</p>
        </Link>
      </div>
      <div className="catalogue-cards mt-4 d-flex justify-content-between">
        <img
          src={require("../../assets/images/neptun-paper.png")}
          className="img-thumbnail mr-3"
          alt="..."
        />
        <img
          src={require("../../assets/images/tehnomarket-paper.png")}
          className="img-thumbnail mr-3"
          alt="..."
        />
        <img
          src={require("../../assets/images/setec-paper.png")}
          className="img-thumbnail mr-3"
          alt="..."
        />
        <img
          src={require("../../assets/images/mebel-vi-paper.png")}
          className="img-thumbnail mr-3"
          alt="..."
        />
        <img
          src={require("../../assets/images/anhoch-paper.png")}
          className="img-thumbnail"
          alt="..."
        />
      </div>
      <h2 className="my-4 font-bold">Популарни продавници</h2>
      <div className="catalogue-cards mt-4 d-flex justify-content-between">
        <img
          src={require("../../assets/images/merkur.png")}
          className="img-thumbnail mr-4"
          alt="..."
        />
        <img
          src={require("../../assets/images/tehnomarket.png")}
          className="img-thumbnail mr-4"
          alt="..."
        />
        <img
          src={require("../../assets/images/mebel-vi.png")}
          className="img-thumbnail mr-4"
          alt="..."
        />
        <img
          src={require("../../assets/images/tehnomarket.png")}
          className="img-thumbnail mr-4"
          alt="..."
        />
        <img
          src={require("../../assets/images/merkur.png")}
          className="img-thumbnail mr-4"
          alt="..."
        />
        <img
          src={require("../../assets/images/mrbricolage.png")}
          className="img-thumbnail"
          alt="..."
        />
      </div>
      <h2 className="my-4 font-bold">Популарни продукти</h2>

      <div className="row">{renderCards()}</div>
    </div>
  );
}

export default CatalogPage;
