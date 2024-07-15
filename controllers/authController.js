
const jwt = require('jsonwebtoken');
const { findUserByMobile } = require('../models/user');
const { comparePassword } = require('../utils/bcryptUtils');

const loginUser = async (req, res) => {
    try {
        const user = await findUserByMobile(req.body.mobileNumber);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await comparePassword(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const jwtSecret = process.env.JWT_SECRET;
        console.log('JWT Secret:', jwtSecret); // Check JWT secret in console

        const token = jwt.sign(
            { id: user.id, firstName: user.firstName, lastName: user.lastName },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { loginUser };


module.exports = { loginUser };


