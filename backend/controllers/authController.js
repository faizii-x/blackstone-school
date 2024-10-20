// /controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "process.env.SECRET_KEY";


// Signup Function
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

// Login Function
const login = async (req, res) => {
  const { email, password } = req.body;


  try {
    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email does not exist" });
    }

    // Compare password with hash password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const { name, email: userEmail, role,  } = user;

    const payload = { userId: user._id, name, userEmail, role };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // If password match, then login
    return res.json({ success: true, message: "Login successful",token, user:{name, userEmail, role} });

  } catch (error) {
    console.log('Login Error: ', error);
    res.json({ success: false, message: "Server error" });
  }
};




module.exports = { signup, login };
