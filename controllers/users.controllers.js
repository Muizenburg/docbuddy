// Import Models
// const Booking = require('../models/booking.model');
const User = require("../models/user.model");

/**
 * @function: viewTodos
 * @description: View todos from the logged in user
 * @access User
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const viewUsers = (req, res) => {
  // console.log ("user id:" + loggedInUser)

  User.find().exec((err, name) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to fetch users",
      });
    }

    return res.json({
      users: name,
    });
  });
};

/**
 * @function: deleteTodo
 * @description: Delete a todo from the logged in user
 * @access User
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const deleteUser = (req, res) => {
  const { _id } = req.params;

  User.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete user",
      });
    }

    return res.status(201).json({
      message: "User has been successfully deleted!",
    });
  });
};

// Export Controllers
module.exports = {
  viewUsers,
  deleteUser,
};
