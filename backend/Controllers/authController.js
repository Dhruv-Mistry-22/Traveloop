const generateToken = require("../utils/jwt");
const {
  hashPassword,
  comparePassword,
} = require("../utils/hash");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  const token = generateToken(user.id);

  res.status(201).json({
    success: true,
    token,
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
   const mockUser = {
    id: 1,
    email,
    password: await hashPassword("123456"),
  };

  const isMatch = await comparePassword(
    password,
    mockUser.password
  );

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(mockUser.id);

  res.status(200).json({
    success: true,
    token,
  });
};


const forgotPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Reset link sent",
  });
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
  forgotPassword,
  getProfile,
};