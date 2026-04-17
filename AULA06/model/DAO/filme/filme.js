/***************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados de Filme no banco de dados MySQL
 * Data:15/04/2026
 * Autor: Evellyn
 * Versão: 1.0
 */
//Import da biblioteca para manipular dados no Banco de dados MYSql
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfing.js')

//Criar conexão 
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir um novo filme no barco de dados
const inserFilme = async function(filme){
    let sql = `insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'${filme.nome}',
    
    '${filme.sinopse}',
    
    '${filme.capa}',
    
    '${filme.data_nascimento}',
    
    '${filme.duracao}',
    
    '${filme.valor}',
    
    '${filme.avaliacao}'
);`
//Encaminha para o BD o scriptSQL
let result = await knexConection.raw(sql)

if(result)
    return true
else
    return false

} 

//Função para atualizar um filme existente no barco de dados
const updateFilme = async function(filme) {
    
}
//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function(){

}
//Função para retornar um filme filtrando pelo ID
const selectByIdFilme = async function(id){

}
//Função para excluir um filme filtrando pelo ID
const deleteFilme = async function(id) {
    
}

module.exports = {
    inserFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}