const bcrypt = require('bcryptjs');

function hash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

function check(password, hash) {
    return bcrypt.compare(password, hash);
}

async function generateResetToken() {
    const currTime = new Date().getTime();
    const salt = await bcrypt.genSalt(10);
    return `${currTime}-${salt}`;
}

module.exports = { hash, check, generateResetToken };