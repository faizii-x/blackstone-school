// /controllers/authController.js
const User = require('../models/User');

// Signup a new user
const signup = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
};

// Login an existing user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with user role
        res.json({ message: 'Login successful', role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

module.exports = { signup, login };
