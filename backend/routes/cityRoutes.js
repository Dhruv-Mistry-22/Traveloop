const express = require("express");
const router = express.Router();
const {
  searchCities,
  popularDestinations,
  filterByCountry,
} = require("../Controllers/cityController");

router.get("/search", searchCities);
router.get("/popular", popularDestinations);
router.get("/filter", filterByCountry);

module.exports = router;
