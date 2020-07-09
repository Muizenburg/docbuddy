// Import Models
const Booking = require("../models/booking.model");
const User = require("../models/user.model");

/**
 * @function: viewTodos
 * @description: View todos from the logged in user
 * @access User
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const viewBookings = (req, res) => {
  const loggedInUser = req.user._id;
  console.log("user id:" + loggedInUser);

  User.findById(loggedInUser).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to fetch bookings",
      });
    }

    return res.json({
      bookings: user.bookings,
    });
  });
};

/**
 * @function: createTodo
 * @description: Create a todo from the logged in user
 * @access User
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const createBooking = (req, res) => {
  const user = req.user._id;
  const booking = new Booking({
    user,
    bookingDesc: req.body.bookingDesc,
    bookingDate: req.body.bookingDate,
  });

  // Save new todo
  booking.save();

  /**
   * Find the logged in user and add the todo
   * to the users "todos" array with .push method
   */
  User.findById(user).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to add booking",
      });
    }

    // Data represents a User object
    data.bookings.push(booking);
    // Save the updated user with the new todo
    data.save();

    return res.status(200).json({
      message: "Booking added!",
      data,
    });
  });
  console.log("BOOKING IS:" + booking);
};

/**
 * @function: deleteTodo
 * @description: Delete a todo from the logged in user
 * @access User
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const deleteBooking = (req, res) => {
  const { _id } = req.params;

  Booking.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete booking",
      });
    }

    return res.status(201).json({
      message: "Booking deleted!",
    });
  });
};

// Export Controllers
module.exports = {
  viewBookings,
  createBooking,
  deleteBooking,
};
