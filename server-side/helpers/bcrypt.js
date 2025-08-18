const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, 8)
}

function comparePassword(plainPass, hashedPass) {
    return bcrypt.compareSync(plainPass, hashedPass)
}

module.exports = {
    hashPassword,
    comparePassword
}