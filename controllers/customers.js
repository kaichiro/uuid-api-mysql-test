const uuid = require('uuid/v4')

const customerModels = require('../models/customers')

const index = async (connection, req, res) => {
    const customers = await customerModels.findAll(connection)
    res.send(customers)
}

const findById = async (connection, req, res) => {
    const id = req.params.id
    const customer = await customerModels.findById({ connection, id })
    res.send(customer)
}

const findLikeName = async (connection, req, res) => {
    const name = req.params.name
    const customers = await customerModels.findLikeName({ connection, name })
    res.send(customers)
}

const deleteById = async (connection, req, res) => {
    const id = req.params.id
    await customerModels.deleteById({ connection, id })
        .then(response => res.send(response))
}

const create = async (connection, req, res) => {
    const id = uuid()
    const customer = { id: id, ...req.body }
    await customerModels.create(connection, customer)
        .then(response => res.send(response))
}

const update = async (connection, req, res) => {
    const customer = req.body
    await customerModels.update(connection, customer)
        .then(response => res.send(response))
}

module.exports = {
    index,
    findById,
    findLikeName,
    deleteById,
    create,
    update,
}