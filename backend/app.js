const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const tripRoutes = require("./routes/tripRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const cityRoutes = require("./routes/cityRoutes");
const activityRoutes = require("./routes/activityRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const packingRoutes = require("./routes/packingRoutes");
const notesRoutes = require("./routes/notesRoutes");
const sharedRoutes = require("./routes/sharedRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Traveloop Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/shared", sharedRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;