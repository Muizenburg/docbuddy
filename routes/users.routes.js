const express = require("express");
const router = express.Router();

// Import requireSignin middlewear
const { requireSignin } = require("../controllers/auth.controllers");

// Import Controllers
const { viewUsers, deleteUser } = require("../controllers/users.controllers");

router.get("/users", requireSignin, viewUsers);
router.delete("/users/:_id", requireSignin, deleteUser);

module.exports = router;
