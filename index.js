const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
require('dotenv/config')

const customerRouter = require('./routes/customers')
const {
    customersGetAll,
    customerById,
    customersLikeName,
    customerDeleteById,
    customerCreate,
    customerUpdate,
} = require('./routes/index')

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(customerRouter(dependences))

app.listen(app_port, (err) => {
    if (err) {
        console.log(`App doesn't work: `, err)
    } else {
        const addressBase = `${app_address}:${app_port}`
        console.log(`API works!`)
        console.log('Method: GET')
        console.log(`  all       = ${addressBase}${customersGetAll}`)
        console.log(`  by Id     = ${addressBase}${customerById.replace(':id', '51073bb0-7ff1-11e9-a38f-18037356addd')}`)
        console.log(`  like Name = ${addressBase}${customersLikeName.replace(':name', 'Kaichiro')}`)
        console.log('Method: DELETE')
        console.log(`  by Id     = ${addressBase}${customerDeleteById.replace(':id', '51073bb0-7ff1-11e9-a38f-18037356addd')}`)
        console.log('Method: POST')
        console.log(`  create    = ${addressBase}${customerCreate}`)
        console.log('Method: PUT')
        console.log(`  update    = ${addressBase}${customerUpdate}`)
    }
})
