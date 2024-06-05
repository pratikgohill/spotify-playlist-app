const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create an acount
const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const saltRounds = 10;
    const hasedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, password: hasedPassword });
    await user.save();
    res.status(201).json({ message: "User sucessfully registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
