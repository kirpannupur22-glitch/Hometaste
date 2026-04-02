const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock database
const users = [];

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            phone,
            createdAt: new Date()
        };

        users.push(newUser);

        // Create token
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'secret_key');

        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: { id: newUser.id, name, email, phone }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret_key');

        res.json({ 
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;