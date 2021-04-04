// add dependencies
const jwt = require('jsonwebtoken');

function generateAccessToken( _id , email , password ) {

    return jwt.sign({ _id : _id , email: email, password: password }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });

}

module.exports = generateAccessToken;