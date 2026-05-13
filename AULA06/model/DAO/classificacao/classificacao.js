/*****************************************
 * Objetivo: Arquivi responsavel pelo CRUD de dados de filmes no banco de dados MySQL 
 * Data:08/05/2026
 * Autor: Evellyn Santiago
 * Versão:1.0
 * *******************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig')

const knexConection = knex(knexDatabaseConfig.development)

const insertClassificacao = async function (classificacao) {
    try {

        let sql = `insert into tbl_classificacao (
                        classificacao,
        ) values (
         
            '${classificacao.classificacao}',


    
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

module.exports = {
    insertClassificacao
}