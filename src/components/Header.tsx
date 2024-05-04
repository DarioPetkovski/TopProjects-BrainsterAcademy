"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [product, setProduct] = useState<{ id: number; product: string }>({
    id: Math.floor(Math.random() * 3000),
    product: "",
  });

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const onSubmitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?menu=${product.product}`);
    setProduct({
      id: Math.floor(Math.random() * 3000),
      product: "",
    });
  };
  return (
    <div className="position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0 sticky-top shadow-sm">
        <Link className="navbar-brand p-0" href="/">
          <h1 className="text-primary m-0">
            <i className="fa fa-utensils me-3"></i>Restoran
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link className="nav-item nav-link active" href="/">
              Home
            </Link>
            <Link className="nav-item nav-link active" href="/about">
              About
            </Link>
            <Link className="nav-item nav-link active" href="/servicesPage">
              Services
            </Link>
            <Link className="nav-item nav-link active" href="/menu">
              Menu
            </Link>
          </div>
          <form
            onSubmit={onSubmitValue}
            action="/search"
            className="d-flex my-2 my-lg-0"
          >
            <div className="me-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="product"
                onChange={onChangeValue}
                value={product.product}
              />
            </div>
            {product.product === "" ? (
              <button disabled className="btn btn-primary" type="submit">
                Search
              </button>
            ) : (
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
