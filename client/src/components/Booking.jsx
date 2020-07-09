import React from "react";
import "./todo.css";
// import trashIcon from '../assets/trash-alt-regular.svg';

const Booking = ({ deleteBooking, bookingObject }) => {
  const { _id, bookingDesc, bookingDate } = bookingObject;

  return (
    <div className="list-group-item">
      <div className="todo-content">
        <h6>{bookingDate}</h6>
        <h6>{bookingDesc}</h6>
        <div className="d-flex icons">
          <button
            className="action-buttons btn btn-danger"
            onClick={deleteBooking.bind(_id, _id)}
          >
            Remove booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
