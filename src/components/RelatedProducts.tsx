import ProductItem, { Product } from "./ProductItem";
async function fetchData() {
  const relatedProducts = await fetch(
    "http://localhost:5001/products?_start=${randomNo}&_limit=4"
  ).then((res) => res.json());
  return relatedProducts;
}
const RelatedProducts = async () => {
  const relatedProducts = await fetchData();
  return (
    <section className="sec-relate-product bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex">
            {relatedProducts.map((item: Product) => {
              return <ProductItem {...item} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
