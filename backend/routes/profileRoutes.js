const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getSavedDestinations,
} = require("../Controllers/profileController");

router.get("/", getProfile);
router.put("/", updateProfile);
router.get("/saved-destinations", getSavedDestinations);

module.exports = router;
