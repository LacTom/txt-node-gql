require('dotenv').config()

module.exports = {
    MONGO_URL: process.env.MONGO_CONNECTION,
    jwtSecret: process.env.JWT_SECRET,
    ADMIN: "admin"
}