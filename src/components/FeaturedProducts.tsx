import ProductItem, { Product } from "./ProductItem";
async function fetchData() {
  const featureProductsData = await fetch(
    "http://localhost:5001/products/?_limit=4"
  ).then((res) => res.json());
  return featureProductsData;
}

const FeaturedProducts = async () => {
  const featureProducts = await fetchData();
  return (
    <section className="sec-product bg0 p-t-100 p-b-50">
      <div className="container">
        <div className="p-b-32">
          <h3 className="ltext-105 cl5 txt-center respon1">Store Overview</h3>
        </div>

        <div className="tab01">
          <div className="tab-content p-t-50">
            <div
              className="tab-pane fade show active"
              id="best-seller"
              role="tabpanel"
            >
              <div className="wrap-slick2">
                <div className="d-flex">
                  {featureProducts.map((item: Product) => {
                    return <ProductItem key={item.id} {...item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
