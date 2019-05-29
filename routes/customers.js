const routes = ({ connection }) => {
    const router = require('express').Router()
    const customerControllers = require('../controllers/customers')

    router.get('/', customerControllers.index.bind(null, connection))
    router.get('/:id', customerControllers.findById.bind(null, connection))
    router.get('/name/:name', customerControllers.findLikeName.bind(null, connection))
    router.delete('/:id', customerControllers.deleteById.bind(null, connection))
    router.post('/', customerControllers.create.bind(null, connection))
    router.put('/', customerControllers.update.bind(null, connection))

    return router
}

module.exports = routes