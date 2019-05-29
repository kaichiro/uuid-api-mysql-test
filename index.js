const mysql = require('mysql2')
require('dotenv/config')

const app_port = process.env.APP_PORT || 3000
const app_address = `http://localhost`
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})
const dependences = { connection }

const app = require('./app')(dependences)

app.listen(app_port, (err) => {
    if (err) {
        console.log(`App doesn't work: `, err)
    } else {
        const addressBase = `${app_address}:${app_port}`
        console.log(`API works! ${addressBase}`)
    }
})
