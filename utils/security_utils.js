const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const generateJwtToken = (user) => {
    return jwt.sign(
        {
            user_id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    )

}

module.exports = generateJwtToken;