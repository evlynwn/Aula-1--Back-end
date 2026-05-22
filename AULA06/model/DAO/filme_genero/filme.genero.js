/*****************************************
 * Objetivo: Arquivi responsavel pelo CRUD de dados MySQL 
 * Data:22/05/2026
 * Autor: Evellyn Santiago
 * Versão:1.0
 * *******************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeGenero = async function (filmeGenero) {
    try {

        let sql = `insert into tbl_filme_genero (
                        id_filme,
                        id_genero
                    ) values (
                    
                        ${filmeGenero.id_filme},
                        ${filmeGenero.id_genero}

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

const updateFilmeGenero = async function (filmeGenero) {
    try{
        let sql = `update tbl_filme_genero set
        id_filme = ${filmeGenero.id_filme}
        id_genero = ${filmeGenero.id_genero}
                where id = ${filmeGenero.id};`

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

const selectAllFilmeGemero = async function () {
    try{
        let sql = 'select * from tbl_filme_genero order by id desc'

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

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql =`select * from tbl_filme_genero where id=${id}`

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

//Função para retornar os dados
const selectGeneroByIdFilme = async function (idFilme) {

    try {
        let sql =`  select tbl_genero.*
                    from  tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme

                        inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genere.id_genero

                    where tbl_filme.id=${idFilme}`

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
const selectFilmeByIdGenero = async function (idFilme) {

    try {
        let sql =`  select tbl_filme.*
                    from  tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme

                        inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genere.id_genero

                    where tbl_genero.id=${idFilme}`

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

const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGemero,
    selectAllFilmeGemero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGeneroByIdFilme,
    selectFilmeByIdGenero
}