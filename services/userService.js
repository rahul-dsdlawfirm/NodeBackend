const { createUser } = require('../models/user');

const registerUser = async (userData) => {
    return createUser(userData);
};

module.exports = { registerUser };
