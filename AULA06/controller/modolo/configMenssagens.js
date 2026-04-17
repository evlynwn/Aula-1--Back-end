/*************************************************************************
 * Objetivo:Arquivo responsavel pela padronização de mensagens e status code do projeto de filmes
 * Data:17/04/2026
 * Autor:Evellyn
 * Versão:1.0
 *****************************************************************************/

//Padronização dos retornos da API(Cabeçalho)
const DEFAULT_MESSAGE = {
    api_descrition: 'API para controlar o projeto de Filmes',
    development: 'Evellyn Santiago de Souza',
    version:'1.0.4.26',
    status: Boolean,
    status_code: Number,
    Response: {}
}

//Mensagens de ERRO do projeto de filme
const ERROR_BAD_REQUEST = {status: false, status_code: 400, message:'Não foi possível processar a requisição devido a erros de entrada de dados' }
const ERROR_INTERNAL_SEVER_MODEL = {status: false, status_code: 500, mensagem:'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'}


//Mensagens de SUCESSO do projeto de filmes
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item inserido com sucesso!'}

module.exports= {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SEVER_MODEL
}