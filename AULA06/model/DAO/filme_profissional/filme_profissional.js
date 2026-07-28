const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeProfissional = async function (filmeProfissional) {
    try {

        let sql = `insert into tbl_filme_profissional (
                        id_filme,
                        id_profissional,
                        id_cargo
                    ) values (
                        ${filmeProfissional.id_filme},
                        ${filmeProfissional.id_profissional},
                        ${filmeProfissional.id_cargo}
                    );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateFilmeProfissional = async function (filmeProfissional) {
    try {

        let sql = `update tbl_filme_profissional set
                        id_filme = ${filmeProfissional.id_filme},
                        id_profissional = ${filmeProfissional.id_profissional},
                        id_cargo = ${filmeProfissional.id_cargo}
                    where id = ${filmeProfissional.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFilmeProfissional = async function () {
    try {

        let sql = 'select * from tbl_filme_profissional order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdFilmeProfissional = async function (id) {
    try {

        let sql = `select * from tbl_filme_profissional where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteFilmeProfissional = async function (id) {
    try {

        let sql = `delete from tbl_filme_profissional where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeProfissional,
    updateFilmeProfissional,
    selectAllFilmeProfissional,
    selectByIdFilmeProfissional,
    deleteFilmeProfissional
}