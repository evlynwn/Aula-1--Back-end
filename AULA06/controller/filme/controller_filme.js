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
const inserirNovoFilme = async function(filme, contentType){



        //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
        let customMessage = JSON.parse(JSON.stringify(configMessagens))

        try {
            
            
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            

                let validar = await validarDados(filme)


                //Retorna um JSON de erro caso algum atributo seja inválido,
                //senão retorna um false (Não teve erro)
                if(validar){
                return validar //400

                }else{
                //Encaminha os dados do Filme para o DAO inserir no BD
                    let result = await filmeDAO.inserFilme(filme)

                    if(result){ //201
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                        return customMessage.DEFAULT_MESSAGE//201

                    }else{ //erro 500
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }

            }else{
                return configMessagens.ERROR_CONTENT_TYLE // 415
            }
        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
        }{


    }
}

//Função para atualizar um filme existente
const atualizarFilme = async function(){
}

//Função para retornar todos os filmes existentes
const listarFilmes = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessagens))

    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()
        
        //Validação para verificar se o DAO consegui processar o script no BD
        if(result){
            //Validação para verificar se o conteúdo do array tem dados de
            // retorno ou se esta vazio
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Model)
        }
    } catch (error) {
         return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (CONTROLLER)
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessagens))


    //Validação para garantir que o ID seja um número válido
    try {
        if(String (id).replaceAll(' ', '' ) == '' || id  == null || id == undefined || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        }else{
            //Chama a função do do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO retornou dados ou FALSE(erro)
            if(result){
                //Validação para verificar se o DAO tem algum dado no Array
                    if(result.length > 0){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filme = result

                        return customMessage.DEFAULT_MESSAGE
                    }else{
                        return customMessage.ERROR_NOT_FOUND //404
                    }
                
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Model)
            }
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
        
    }
}

//Função para excluir um filme
const excluirFilmes = async function(){
}

//Função para validar os dados de cadastro do Filme
const validarDados = async function(filme){

     //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
     let customMessage = JSON.parse(JSON.stringify(configMessagens))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length !=10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilmes,
    buscarFilme,
    excluirFilmes
}