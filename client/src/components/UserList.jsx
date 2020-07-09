import React from "react";
import "./todo.css";

const User = ({ deleteUser, userObject }) => {
  const { _id, name, email } = userObject;

  return (
    <div className="list-group-item">
      <div className="todo-content">
        <h6>{name}</h6>
        <h6>{email}</h6>
        <div className="d-flex icons">
          <button
            className="action-buttons btn btn-danger"
            onClick={deleteUser.bind(_id, _id)}
          >
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
