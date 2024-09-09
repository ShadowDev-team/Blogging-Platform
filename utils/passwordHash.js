const bcrypt = require('bcrypt');

function hash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

function check(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = { hash, check };