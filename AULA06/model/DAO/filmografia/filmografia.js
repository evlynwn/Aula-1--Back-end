const knex = require('knex')

const knexConection = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmografia = async function (filmografia) {
    try {

        let sql = `insert into tbl_filmografia (
                        filmografia
                    ) values (
                    
                        '${filmografia.filmografia}'

                    );`

        let result = await knexConection.raw(sql)
        
        if(result)
            return result[0]. insertId
        else
            return false
    }
    catch (error) {
        
        return false
    }
    
}

const updateFilmografia = async function (filmografia) {
    try{
        let sql = `update tbl_filmografia set
        filmografia   = '${filmografia.filmografia}'
                where id = ${filmografia.id};`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    }catch (error) {
        return false
    }
}

const selectAllFilografia = async function () {
    try{
        let sql = 'select * from tbl_filmografia order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error){
        return false
    }
}

const selectByIdFilmografia = async function (id) {
    try {
        let sql =`select * from tbl_filmografia where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else {
            return false
        }
    }catch (error) {
        return false
    }
    
}

const deleteFilmografia = async function (id) {
    try {
        let sql = `delete from tbl_filmografia where id=${id}`

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
    insertFilmografia,
    updateFilmografia,
    selectAllFilografia,
    selectByIdFilmografia,
    deleteFilmografia
}
