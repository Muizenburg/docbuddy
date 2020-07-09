const express = require("express");
const router = express.Router();

// Import requireSignin middlewear
const { requireSignin } = require("../controllers/auth.controllers");

// Import Controllers
const {
  viewBookings,
  createBooking,
  deleteBooking,
} = require("../controllers/booking.controllers");

router.get("/bookings", requireSignin, viewBookings);
router.post("/bookings/new", requireSignin, createBooking);
router.delete("/bookings/:_id", requireSignin, deleteBooking);

module.exports = router;
