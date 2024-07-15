const db = require('../config/db');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/bcryptUtils');

const createUser = async (user) => {
    const hashedPassword = await hashPassword(user.password);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (firstName, lastName, mobileNumber, password, createdDate, createdBy, updatedDate, updatedBy) VALUES (?, ?, ?, ?, UTC_TIMESTAMP(), ?, UTC_TIMESTAMP(), ?)';
        db.query(query, [user.firstName, user.lastName, user.mobileNumber, hashedPassword, user.firstName, user.firstName], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const findUserByMobile = (mobileNumber) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE mobileNumber = ?';
        db.query(query, [mobileNumber], (error, results) => {
            if (error) {
                console.error('Error finding user by mobile number:', error);
                return reject(error);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
};

module.exports = { createUser, findUserByMobile };
