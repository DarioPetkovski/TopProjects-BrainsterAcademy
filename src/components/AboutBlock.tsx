async function fetchData() {
  const data = await fetch("http://localhost:5001/about_block").then((res) =>
    res.json()
  );
  return data;
}

const AboutBlock = async () => {
  const aboutBlock = await fetchData();
  return (
    <div className=" py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100"
                  src={aboutBlock.image_one}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75"
                  src={aboutBlock.image_two}
                  style={{ marginTop: "25% " }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75"
                  src={aboutBlock.image_three}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-100"
                  src={aboutBlock.image_four}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              {aboutBlock.preTitle}
            </h5>
            <h1 className="mb-4">{aboutBlock.title}</h1>
            <p className="mb-4">{aboutBlock.first_paragraph}</p>
            <p className="mb-4">{aboutBlock.second_paragraph}</p>
            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    {aboutBlock.years}
                  </h1>
                  <div className="ps-4">
                    <h6 className="text-uppercase mb-0">{aboutBlock.slogan}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    {aboutBlock.number_of_chefs}
                  </h1>
                  <div className="ps-4">
                    <h6 className="text-uppercase mb-0">
                      {aboutBlock.slogan_two}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBlock;
