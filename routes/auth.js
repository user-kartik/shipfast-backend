const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { username } });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ username, password });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get Profile
router.get('/profile', async (req, res) => {
    // Step 1: Get the token from the Authorization header
    const token = req.headers['authorization'];
    console.log("Received Token: ", token); // Log token for debugging

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Step 2: Verify the token and decode it
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log("Decoded Token: ", decoded); // Log decoded token for debugging
        
        // Step 3: Query the database to find the user by the decoded id
        const user = await User.findByPk(decoded.id);
        console.log("User found: ", user); // Log the user object for debugging
        
        // Step 4: Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Step 5: Return the user profile
        res.json({ username: user.username });
    } catch (error) {
        console.error("Error in profile route:", error); // Log the error for debugging
        res.status(500).json({ message: "Server error" });
    }
});


// Alive status endpoint
router.get('/status', (req, res) => {
    res.status(200).json({ message: 'alive' });
});

module.exports = router;
