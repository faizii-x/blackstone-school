// /controllers/authController.js
const User = require("../models/user");

// Signup a new user
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("SignUp Error: ", error);
    return res.json({
      success: false,
      message: "Error signing up user",
      error,
    });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success:false , message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.json({ success:false, message: "Invalid credentials" });
    }

    // Respond with user role
    res.json({ success:true, message: "Login successful", role: user.role });
  } catch (error) {
    res.json({success:false, message: "Error logging in user", error });
  }
};

module.exports = { signup, login };
