const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeAtor = async function (filmeAtor) {
    try {

        let sql = `insert into tbl_filme_ator (
                        id_filme,
                        id_ator
                    ) values (
                        ${filmeAtor.id_filme},
                        ${filmeAtor.id_ator}
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

const updateFilmeAtor = async function (filmeAtor) {
    try {

        let sql = `update tbl_filme_ator set
                        id_filme = ${filmeAtor.id_filme},
                        id_ator = ${filmeAtor.id_ator}
                    where id = ${filmeAtor.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFilmeAtor = async function () {
    try {

        let sql = 'select * from tbl_filme_ator order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdFilmeAtor = async function (id) {
    try {

        let sql = `select * from tbl_filme_ator where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteFilmeAtor = async function (id) {
    try {

        let sql = `delete from tbl_filme_ator where id=${id}`

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
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    deleteFilmeAtor
}