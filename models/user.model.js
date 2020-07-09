const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "usersListSchema",
      },
    ],
  },
  { timestamps: true }
);

// Virtual Fill to Encrypt Password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.generateSalt(); // mongo db method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // true || false
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  generateSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "");
  },
};

// // Auto Populate Posts
const autoPopulateBookings = function (next) {
  this.populate("bookings", "_id bookingDesc bookingDate");
  next();
};

const autoPopulateTodos = function (next) {
  this.populate("todos", "_id todo user");
  next();
};

const autoPopulateUserList = function (next) {
  this.populate("userList", "_id name email");
  next();
};

userSchema.pre("findById", autoPopulateTodos);
userSchema.pre("findOne", autoPopulateTodos);
userSchema.pre("find", autoPopulateTodos);

userSchema.pre("findById", autoPopulateBookings);
userSchema.pre("findOne", autoPopulateBookings);
userSchema.pre("find", autoPopulateBookings);

userSchema.pre("findById", autoPopulateUserList);
userSchema.pre("findOne", autoPopulateUserList);
userSchema.pre("find", autoPopulateUserList);

module.exports = mongoose.model("User", userSchema);
