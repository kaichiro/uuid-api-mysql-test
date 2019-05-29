const routes = ({ connection }) => {
    const router = require('express').Router()

    const customerRoutes = require('./customers')

    router.get('/', (req, res) => res.send('<h1>API is working!!!</h1>'))

    router.use('/customers', customerRoutes(connection))

    return router
}

module.exports = routes