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
    res.send({ menssage: 'Object deleted successfully!!', })
}

const create = async (connection, req, res) => {
    const id = uuid()
    const data = { id: id, ...req.body }
    await customerModels.create(connection, data)
    const customer = await customerModels.findById({ connection, id })
    res.send(customer)
}

const update = async (connection, req, res) => {
    const data = req.body
    const id = data.id
    await customerModels.update(connection, data)
    const customer = await customerModels.findById({ connection, id })
    res.send(customer)
}

module.exports = {
    index,
    findById,
    findLikeName,
    deleteById,
    create,
    update,
}