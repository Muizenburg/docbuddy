import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { getCookie, signout } from "../auth/Helpers";
import Booking from "./Booking";

const Bookings = ({ history }) => {
  // Signup State
  const [values, setValues] = useState({
    bookingDesc: "",
    bookingDate: new Date(),
    bookings: [],
    loading: true,
  });

  const { bookingDesc, bookingDate, bookings, loading } = values;

  const token = getCookie("token");

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = () => {
    axios({
      method: "GET",
      url: `/api/bookings`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log('PRIVATE PROFILE UPDATE', response)
        const bookings = response.data.bookings;
        setValues({
          ...values,
          bookings,
          bookingDesc: "",
          bookingDate: new Date(),
          loading: false,
        });
      })
      .catch((error) => {
        // console.log('LOAD TODOS ERROR', error.response.data.error);
        if (error.response.status === 400) signout(() => history.push("/"));
      });
  };

  // Get user input from form
  const handleChangeDesc = (e) =>
    setValues({ ...values, bookingDesc: e.target.value });
  const handleChangeDate = (e) =>
    setValues({ ...values, bookingDate: e.target.value });

  const addBooking = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/api/bookings/new`,
      data: { bookingDesc, bookingDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setValues({
          ...values,
          bookings,
          bookingDesc: "",
          bookingDate: new Date(),
        });
        toast.success(res.data.message);
      })
      .then(loadBookings)
      .catch((error) => {
        toast.error(error.res.data.error);
      });
  };

  const deleteBooking = (id) => {
    axios({
      method: "DELETE",
      url: `/api/bookings/${id}`,
      data: { bookingDesc },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success(response.data.message);
      })
      .then(loadBookings)
      .catch((error) => {
        toast.error(error.response.data.error);
      });

    console.log(bookingDesc);
  };

  const bookingForm = () => (
    <form onSubmit={addBooking}>
      <div className="form-group">
        <label className="text-muted">Appointment note: </label>
        <input
          onChange={handleChangeDesc}
          value={bookingDesc}
          type="text"
          required
          className="form-control"
        />
        <label className="text-muted">Appointment date: </label>
        <input
          onChange={handleChangeDate}
          value={bookingDate}
          type="date"
          required
          className="form-control"
        />
        <button type="submit" className="action-buttons btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="col-md-10 offset-md-1">
      <ToastContainer />
      <h1 className="p-5 text-center">Booking Page</h1>
      {bookingForm()}

      {loading === true ? (
        <h1 className="pt-5 text-center ">Loading...</h1>
      ) : bookings.length === 0 ? (
        <React.Fragment>
          <h3 className="pt-5 text-center">No bookings scheduled!</h3>
          <p className="lead text-center">
            Schedule a booking by selecting a date and time as well as leave a
            note for the doctor to describe your reason for visit{" "}
          </p>
        </React.Fragment>
      ) : (
        <ul className="list-group list-group-flush">
          {bookings.map((bookingObject) => (
            <Booking
              bookingObject={bookingObject}
              key={bookingObject._id}
              deleteBooking={deleteBooking}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
