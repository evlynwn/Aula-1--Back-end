const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertAtor = async function (ator) {
    try {

        let sql = `insert into tbl_ator (
                        ator
                    ) values (
                        '${ator.ator}'
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

const updateAtor = async function (ator) {
    try {

        let sql = `update tbl_ator set
                        ator = '${ator.ator}'
                    where id = ${ator.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtor = async function () {
    try {

        let sql = 'select * from tbl_ator order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function (id) {
    try {

        let sql = `select * from tbl_ator where id = ${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtor = async function (id) {
    try {

        let sql = `delete from tbl_ator where id = ${id}`

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
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}