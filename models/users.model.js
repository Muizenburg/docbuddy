const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersListSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      min: 3,
    },
    email: {
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

usersListSchema.pre("findOne", autoPopulateUser);
usersListSchema.pre("findById", autoPopulateUser);
usersListSchema.pre("find", autoPopulateUser);

module.exports = mongoose.model("usersListSchema", usersListSchema);
