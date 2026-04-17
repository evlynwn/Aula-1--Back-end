/***************************************************************
 * Objetivo:Arquivo responsavel pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data:17/04/2026
 * Autor:Evellyn
 * Versão:1.0
 ******************************************************************/
//Import do arquivo de configurações de mensagens do projeto
const configMessagens = require('../modolo/configMenssagens.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de dados
const filmeDAO =require('../../model/DAO/filme/filme.js')

//Função para inserir novo filme
const inserirNovoFilme = async function(filme){

    //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
    let customMessage = JSON.parse(JSON.stringify(configMessagens))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'

    }else if(filme.sinopse == '' || filme.sinopne == null || filme.sinopse == undefined){
        customMessage.ERROR_BAD_REQUEST = '[SINOPSE] INVÁLIDO'

    } else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST = '[CAPA] INVÁLIDO'

    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length !=10){
        customMessage.ERROR_BAD_REQUEST = '[DATA DE LANÇAMENTO] INVÁLIDO'

    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST = '[DURAÇÃO] INVÁLIDO'

    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST = '[VALOR] INVÁLIDO'

    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST = '[AVALIAÇÃO] INVÁLIDO'

    }else{
        let result = await filmeDAO.inserFilme(filme)

        if(result){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
            customMessage.DEFAULT_MESSAGE.statu_code = customMessage.SUCCESS_CREATED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
        }else{
            customMessage.DEFAULT_MESSAGE.status = customMessage.ERROR_INTERNAL_SEVER_MODEL.status
            customMessage.DEFAULT_MESSAGE.statu_code = customMessage.ERROR_INTERNAL_SEVER_MODEL.statu_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.ERROR_INTERNAL_SEVER_MODEL.message
        }
        return customMessage
    }

}

//Função para atualizar um filme existente
const atualizarFilme = async function(){
}

//Função para retornar todos os filmes existentes
const listarFilmes = async function(){
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(){
}

//Função para excluir um filme
const excluirFilmes = async function(){
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilmes,
    buscarFilme,
    excluirFilmes
}