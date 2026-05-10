const express = require("express");

const {
  signup,
  login,
  googleLogin,
  forgotPassword,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, getProfile);

module.exports = router;