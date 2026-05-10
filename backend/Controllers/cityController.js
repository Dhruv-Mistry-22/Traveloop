const searchCities = async (req, res) => {
  res.json({ success: true, cities: [] });
};

const popularDestinations = async (req, res) => {
  res.json({ success: true, destinations: [] });
};

const filterByCountry = async (req, res) => {
  res.json({ success: true, countryCities: [] });
};

module.exports = {
  searchCities,
  popularDestinations,
  filterByCountry,
};