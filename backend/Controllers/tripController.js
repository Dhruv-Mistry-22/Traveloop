const { prisma } = require("../src/config/database");

const createTrip = async (req, res) => {
  try {
    const { title, description, startsOn, endsOn, isMultiCity } = req.body;
    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        startsOn: new Date(startsOn),
        endsOn: endsOn ? new Date(endsOn) : null,
        isMultiCity,
        userId: req.user.id,
      },
    });
    res.status(201).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTrips = async (req, res) => {
  try {
    // If we have a user from authMiddleware, filter by userId
    const userId = req.user?.id;
    const trips = await prisma.trip.findMany({
      where: userId ? { userId } : {},
      include: {
        _count: {
          select: { stops: true }
        }
      },
      orderBy: { startsOn: 'asc' }
    });

    res.json({ success: true, trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTrip = async (req, res) => {
  res.json({ success: true, message: "Trip updated" });
};

const deleteTrip = async (req, res) => {
  res.json({ success: true, message: "Trip deleted" });
};

const getSingleTrip = async (req, res) => {
  res.json({ success: true, trip: {} });
};

module.exports = {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrips,
  getSingleTrip,
};