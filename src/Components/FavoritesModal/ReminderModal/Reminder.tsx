import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Product } from "../../../interfaces/interfaces";
import "./reminder.css";

export const ReminderModal = () => {
  const { data, toggleNotifications } = useGlobalContext();
  const filteredItems = data?.filter((item) => item.notifications);

  const handleNotification = (event: any, id: string) => {
    event?.preventDefault();
    toggleNotifications(id);
  };
  const renderCards = () => {
    return filteredItems?.map((card: Product) => {
      return (
        <div key={card.id} className="rounded-4 my-2 bg-white">
          <div className="d-flex mt-2 justify-content-between">
            <h2 className="fw-bold">Известување за цени</h2>
            <button
              onClick={(event) => handleNotification(event, card.id)}
              className="btn"
            >
              X
            </button>
          </div>
          <div className="d-flex">
            <img src={require(`../../../assets/images/${card.image}`)} alt="" />
            <div className="d-flex flex-column justify-content-center ml-5">
              <h1>{card.name}</h1>
              <p className="mb-0">{card.desc}</p>
              <small>{card.rating}</small>
              <p className="mt-5">{card.price} ден.</p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="row mx-5 py-4 overflow-y-auto custom-reminder-h">
      {renderCards()}
      <div className="d-flex justify-content-around">
        <div className="py-3 text-center">
          <p>Lorem, ipsum dolor</p>
          <h4 className="fw-bold">000 ден.</h4>
        </div>
        <div className="py-3 text-center">
          <p>Lorem, ipsum dolor</p>
          <h4 className="fw-bold">000 ден.</h4>
        </div>
        <div className="py-3 text-center">
          <p>Lorem, ipsum dolor</p>
          <h4 className="fw-bold">000 ден.</h4>
        </div>
      </div>
    </div>
  );
};
