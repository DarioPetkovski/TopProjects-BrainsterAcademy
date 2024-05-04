async function fetchData() {
  const data = await fetch("http://localhost:5001/banner_content").then((res) =>
    res.json()
  );
  return data;
}

const Banner = async () => {
  const data = await fetchData();
  return (
    <div className="py-5 bg-dark hero-header mb-5">
      <div className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 text-white">{data.title}</h1>
            <p className="text-white mb-4 pb-2">{data.content}</p>
            <a href="#" className="btn btn-primary py-sm-3 px-sm-5 me-3">
              {data.button_title}
            </a>
          </div>
          <div className="col-lg-6 text-center text-lg-end overflow-hidden">
            <img className="img-fluid" src="/images/hero.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
