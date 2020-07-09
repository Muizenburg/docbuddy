const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingDesc: {
      type: String,
      min: 3,
    },
    bookingDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Auto Populate Users
const autoPopulateUser = function (next) {
  this.populate("User", "_id name email user");
  next();
};

bookingSchema.pre("findOne", autoPopulateUser);
bookingSchema.pre("findById", autoPopulateUser);
bookingSchema.pre("find", autoPopulateUser);

module.exports = mongoose.model("Booking", bookingSchema);
