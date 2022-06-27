const express = require("express");
const { registerUser, authUser, logoutUser } = require("../controllers/userController");

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);

module.exports = router;