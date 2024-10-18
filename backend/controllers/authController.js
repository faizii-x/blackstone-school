// /controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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


const login = async (req, res) => {
  const { email, password } = req.body;


  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const { name, email: userEmail, role,  } = user;

    const payload = { userId: user._id, name, userEmail, role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3m' });

    // If passwords match, continue with login
    return res.json({ success: true, message: "Login successful",token, user:{name, userEmail, role} });

  } catch (error) {
    console.log('Login Error: ', error);
    res.json({ success: false, message: "Server error" });
  }
};

module.exports = { signup, login };
