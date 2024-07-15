const { createUser, findUserByMobile } = require('../models/user');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const registerUser = async (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (firstName, lastName, mobileNumber, password, createdDate, createdBy, updatedDate, updatedBy) VALUES (?, ?, ?, ?, NOW(), ?, NOW(), ?)';
        const values = [firstName, lastName, mobileNumber, hashedPassword, 'system', 'system'];

        db.query(query, values, (error, results) => {
            if (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({ message: 'Error registering user', error });
            }
            res.status(201).json({ message: 'User registered successfully', user: results });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

module.exports = { registerUser };
