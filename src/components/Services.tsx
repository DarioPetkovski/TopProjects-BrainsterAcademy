async function fetchData(url: string) {
  const data = await fetch(url).then((res) => res.json());
  return data;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Services = async () => {
  const servicesBlock = await fetchData("http://localhost:5001/services_block");
  const services = await fetchData("http://localhost:5001/services");
  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            {servicesBlock.preTitle}
          </h5>
          <h1 className="mb-5">{servicesBlock.title}</h1>
        </div>
        <div className="row g-4">
          {services.map((service: Service) => {
            return (
              <div key={service.id} className="col-lg-3 col-sm-6">
                <div className="service-item rounded pt-3">
                  <div className="p-4">
                    <i className={`${service.icon} text-primary mb-4`} />
                    <h5>{service.title}</h5>
                    <p>{service.description}</p>
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
