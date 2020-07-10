const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// Make use of .env for config
require("dotenv").config();

// Init Express
const app = express();

//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());

// App middlewear
app.use(express.json()); // enable this to recieve JSON data from client
app.use(morgan("dev")); // visualize api requests
app.use(cors());

// Connect to MongoDb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected ..."))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// Import Routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const bookingRoutes = require("./routes/booking.routes");

// Use Routes middlewear
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);
app.use("/api", bookingRoutes);
app.use("/api", usersRoutes);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Establish Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
