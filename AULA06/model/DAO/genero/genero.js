/*****************************************
 * Objetivo: Arquivi responsavel pelo CRUD de dados MySQL 
 * Data:22/05/2026
 * Autor: Evellyn Santiago
 * Versão:1.0
 * *******************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function (genero) {
    try {

        let sql = `insert into tbl_genero (
                        genero
                    ) values (
                    
                        '${genero.genero}'

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

const updateGenero = async function (genero) {
    try{
        let sql = `update tbl_genero set
                    genero   = '${genero.genero}'
                    where id = ${genero.id};`

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

const selectAllGenero = async function () {
    try{
        let sql = 'select * from tbl_genero order by id desc'

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

const selectByIdGenero = async function (id) {
    try {
        let sql =`select * from tbl_genero where id=${id}`

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

const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id=${id}`

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
    insertGenero,
    selectAllGenero,
    selectByIdGenero,
    updateGenero,
    deleteGenero
}


