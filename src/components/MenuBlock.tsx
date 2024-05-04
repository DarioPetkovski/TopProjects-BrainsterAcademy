async function fetchData(url: string) {
  const data = await fetch(url).then((res) => res.json());
  return data;
}

interface Menu {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

const MenuBlock = async () => {
  const menuBlock = await fetchData("http://localhost:5001/menu_block");
  const menuData = await fetchData("http://localhost:5001/menu");
  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            {menuBlock.preTitle}
          </h5>
          <h1 className="mb-5">{menuBlock.title}</h1>
        </div>
        <div className=" text-center">
          <div className="row g-4">
            {menuData.map((menu: Menu) => {
              return (
                <div key={menu.id} className="col-lg-6">
                  <div className="d-flex align-items-center">
                    <img
                      className="flex-shrink-0 img-fluid rounded"
                      src={menu.image}
                      alt=""
                      style={{ width: "80px" }}
                    />
                    <div className="w-100 d-flex flex-column text-start ps-4">
                      <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span>{menu.name}</span>
                        <span className="text-primary">${menu.price}</span>
                      </h5>
                      <small className="fst-italic">{menu.description}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBlock;
