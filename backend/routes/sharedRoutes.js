const express = require("express");
const router = express.Router();
const {
  createShareLink,
  viewSharedTrip,
  copyTrip,
} = require("../Controllers/sharedController");

router.post("/link", createShareLink);
router.get("/:id", viewSharedTrip);
router.post("/:id/copy", copyTrip);

module.exports = router;
