import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Product } from "../../../interfaces/interfaces";
import { ProductCard } from "../../ProductCard/ProducCard";

interface TitleProps {
  title: string;
}

export const ProductSection = ({ title }: TitleProps) => {
  const data = useGlobalContext();

  const renderCards = () => {
    return data.data?.slice(0, 6).map((card: Product) => {
      return (
        <div key={card.id} className="col-12 col-md-4 col-lg-2 mb-3 d-flex">
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
    <div className="row py-4">
      <div className="d-flex justify-content-between py-3">
        <h2>{title}</h2>
        <Link
          to={`${
            title === "Најдобри зделки на денот"
              ? "/bestdeals"
              : "/productlisting"
          }`}
          className="text-decoration-none text-dark pt-2"
        >
          Види повеќе {">"}
        </Link>
      </div>
      <div className="row">{renderCards()}</div>
    </div>
  );
};
