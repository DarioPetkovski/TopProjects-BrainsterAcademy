export interface ServicesInterface {
  id: string;
  image: string;
  title: string;
  description: string;
  icon: string;
}
export interface ServicesBlock {
  preTitle: string;
  title: string;
}

const Services = ({
  serviceBlockContent,
  serviceContent,
}: {
  serviceContent: ServicesInterface[];
  serviceBlockContent: ServicesBlock;
}) => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h4 className="section-title">{serviceBlockContent.preTitle}</h4>
          <h1 className="display-5 mb-4">{serviceBlockContent.title}</h1>
        </div>
        <div className="row g-4">
          {serviceContent.map((item: ServicesInterface) => {
            return (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="service-item d-flex position-relative text-center h-100">
                  <img className="bg-img" src={item.image} alt="" />
                  <div className="service-text p-5">
                    <img className="mb-4" src={item.icon} alt="Icon" />
                    <h3 className="mb-3">{item.title}</h3>
                    <p className="mb-4">{item.description}</p>
                    <a className="btn" href="">
                      <i className="fa fa-plus text-primary me-3"></i>Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
