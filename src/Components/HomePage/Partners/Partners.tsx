import { Link } from "react-router-dom";

export const Partners = () => {
  return (
    <div className="row mx-5 py-4">
      <h2 className="py-3">Партнери</h2>

      <div className="d-flex justify-content-between img-wrapper">
        <div className="text-center box">
          <img src={require("../../../assets/images/merkur.png")} alt="" />
        </div>
        <div className="text-center box">
          <img src={require("../../../assets/images/neptun.png")} alt="" />
        </div>
        <div className="text-center box">
          <img src={require("../../../assets/images/mebel-vi.png")} alt="" />
        </div>
        <div className="text-center box">
          <img src={require("../../../assets/images/tehnomarket.png")} alt="" />
        </div>
        <div className="text-center box">
          <img src={require("../../../assets/images/mrbricolage.png")} alt="" />
        </div>
        <div className="text-center box">
          <img src={require("../../../assets/images/anhoch.png")} alt="" />
        </div>
      </div>
    </div>
  );
};
