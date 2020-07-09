import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { getCookie, signout } from "../auth/Helpers";
import User from "./UserList";

const Users = ({ history }) => {
  // Signup State
  const [values, setValues] = useState({
    name: "",
    email: new Date(),
    users: [],
    loading: true,
  });

  const { name, email, users, loading } = values;

  const token = getCookie("token");

  useEffect(() => {
    loadUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = () => {
    axios({
      method: "GET",
      url: `/api/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log('PRIVATE PROFILE UPDATE', response)
        const users = response.data.users;
        setValues({ ...values, users, name: "", email: "", loading: false });
      })
      .catch((error) => {
        // console.log('LOAD TODOS ERROR', error.response.data.error);
        if (error.response.status === 400) signout(() => history.push("/"));
      });
  };

  const deleteUser = (id) => {
    axios({
      method: "DELETE",
      url: `/api/users/${id}`,
      data: { name, email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success(response.data.message);
      })
      .then(loadUsers)
      .catch((error) => {
        toast.error(error.response.data.error);
      });

    // console.log(bookingDesc)
  };

  return (
    <div className="col-md-10 offset-md-1">
      <ToastContainer />
      <h1 className="p-5 text-center">List of users</h1>
      {loading === true ? (
        <h1 className="pt-5 text-center ">Loading...</h1>
      ) : users.length === 0 ? (
        <React.Fragment>
          <h3 className="pt-5 text-center">
            There are no users found on this app.
          </h3>
        </React.Fragment>
      ) : (
        <ul className="list-group list-group-flush">
          {users.map((userObject) => (
            <User
              userObject={userObject}
              key={userObject._id}
              deleteUser={deleteUser}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
