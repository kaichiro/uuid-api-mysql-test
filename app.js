const init = connection => {
    const express = require('express')
    const bodyParser = require('body-parser')

    const app = express()
    const customerRouter = require('./routes/customers')

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    app.use(customerRouter(connection))

    return app
}

module.exports = init