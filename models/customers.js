const loggingSqlCommand = require('../utils/log')

const dataFields_InsertUpdate = (data) => {
    return `name = '${data.name}'`
        .concat((data.birth_day) ? `, birth_day = '${data.birth_day}'` : ``)
}

const dataFields_Selects = () => {
    return `BIN_TO_UUID(id) id`
        .concat(`, name`)
        .concat(`, birth_day`)
}

const findAll = connection => {
    return new Promise((resolve, reject) => {
        const sql = `select ${dataFields_Selects()} from customers order by name;`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findAll')
        }
        connection.query(sql, (err, results) => {
            (err) ? reject(err) : resolve(results)
        })
    })
}

const findById = ({ connection, id }) => {
    return new Promise((resolve, reject) => {
        const sql = `select ${dataFields_Selects()} from customers where id = uuid_to_bin('${id}') limit 1`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findByID')
        }
        connection.query(sql, (err, results) => {
            (err) ? reject(err) : resolve(results[0])
        })
    })
}

const findLikeName = ({ connection, name }) => {
    return new Promise((resolve, reject) => {
        const sql = `select ${dataFields_Selects()} from customers where name like '%${name}%' order by name`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'findLikeName')
        }
        connection.query(sql, (err, results) => {
            (err) ? reject(err) : resolve(results)
        })
    })
}

const deleteById = ({ connection, id }) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from customers where id = uuid_to_bin('${id}')`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'deleteById')
        }
        connection.query(sql, (erro, results) => {
            if (erro) {
                reject(erro)
            } else {
                (1 === results.affectedRows)
                    ? resolve({ message: `Record deleted successfully!` })
                    : resolve({ message: `No records found to be deleted!` })
            }
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into customers set id = UUID_TO_BIN('${data.id}'), ${dataFields_InsertUpdate(data)};`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'create')
        }
        connection.query(sql, (err, results) => {
            (err) ? reject(err) : resolve(data)
        })
    })
}

const update = (connection, data) => {
    return new Promise((resolve, reject) => {
        const sql = `update customers set ${dataFields_InsertUpdate(data)} where id = UUID_TO_BIN('${data.id}');`
        if ('true' === process.env.SHOW_SQL_CMD) {
            loggingSqlCommand(sql, 'update')
        }
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                (1 === results.affectedRows)
                    ? resolve(data)
                    : resolve({ message: `No records found to be updated!` })
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    findLikeName,
    deleteById,
    create,
    update,
}