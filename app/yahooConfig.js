require("dotenv/config")

const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.yahoologin,
        pass: process.env.yahoopassword
    }
}


module.exports = { config }