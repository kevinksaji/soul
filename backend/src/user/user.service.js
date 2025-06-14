const User = require('./user.model');
const bcrypt = require('bcryptjs');

async function createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    return user.save();
}

async function findUserByEmail(email) {
    return User.findOne({ email });
}

module.exports = {
    createUser,
    findUserByEmail
}