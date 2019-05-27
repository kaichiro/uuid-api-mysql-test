const routes = ({ connection }) => {
    const router = require('express').Router()
    const customerControllers = require('../controllers/customers')
    const {
        customersGetAll,
        customerById,
        customersLikeName,
        customerDeleteById,
        customerCreate,
        customerUpdate,
    } = require('./index')

    router.get(customersGetAll, customerControllers.index.bind(null, connection))
    router.get(customerById, customerControllers.findById.bind(null, connection))
    router.get(customersLikeName, customerControllers.findLikeName.bind(null, connection))
    router.delete(customerDeleteById, customerControllers.deleteById.bind(null, connection))
    router.post(customerCreate, customerControllers.create.bind(null, connection))
    router.put(customerUpdate, customerControllers.update.bind(null, connection))

    return router
}

module.exports = routes