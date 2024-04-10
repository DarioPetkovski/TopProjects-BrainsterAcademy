import React from "react";
import { ServicesBlock } from "./Services";

interface TeamContnetInterface {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  avatar: string;
}

const Team = ({
  teamBlock,
  teamContent,
}: {
  teamBlock: ServicesBlock;
  teamContent: TeamContnetInterface[];
}) => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h4 className="section-title">{teamBlock.preTitle}</h4>
          <h1 className="display-5 mb-4">{teamBlock.title}</h1>
        </div>
        <div className="row g-0 team-items">
          {teamContent.map((item: TeamContnetInterface) => {
            return (
              <div key={item.id} className="col-lg-3 col-md-6">
                <div className="team-item position-relative">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.avatar} alt="" />
                    <div className="team-social text-center">
                      <a className="btn btn-square" href="">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="btn btn-square" href="">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="btn btn-square" href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="bg-light text-center p-4">
                    <h3 className="mt-2">
                      {item.first_name} {item.last_name}
                    </h3>
                    <span className="text-primary">{item.position}</span>
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

export default Team;
