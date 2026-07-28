/***********************************************************
 * Objetivo:Arquivo responsavel pela, validação, tratameento, manipulação de dados para
 * Data:08/05
 * Autor:Evellyn Santiago
 * Versão:1.0
 * **************************************/

const configMenssagens = require('../modolo/configMenssagens.js')

const classificacaoDAO = require ('../../model/DAO/classificacao/classificacao.js')

const inserirClassificacao = async function (classificacao, contentType) {
    
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            console.log(contentType)

            let validar = await validarDados(classificacao)


            if(!validar){

                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))
                
                if(result){

                    classificacao.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
                
            }else{
                
                return validar
            
            }

        }else{
            return configMenssagens.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarClassificacao = async function(){

    let customMessage  = JSON.parse(JSON.stringify(configMenssagens))

    try {

        let result = await classificacaoDAO.selectAllClassificacao()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.classificacao = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND
            }


        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Model)
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (CONTROLLER)
    }
} 

const atualizarClassificacao = async function (classificacao, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarClassificacao = await buscarClassificacao(id)
            if (resultBuscarClassificacao.status) {

                if (resultBuscarClassificacao) {

                    let validar = await validarDados(classificacao)
                    if (!validar) {

                        classificacao.id = Number(id)

                        let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))
                        if (result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = classificacao

                            return customMessage.DEFAULT_MESSAGE

                        }else {
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL
                        }

                    }else {
                        return validar
                    }
                }else {
                    return customMessage.ERROR_BAD_REQUEST
                }

            } else {
                return resultBuscarClassificacao
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    }catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}
const buscarClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

  try {
          if(String (id).replaceAll(' ', '' ) == '' || id  == null || id == undefined || isNaN(id)){
              customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
              return customMessage.ERROR_BAD_REQUEST 
  
          }else{
              
              let result = await classificacaoDAO.selectByIdClassificacao(id)
  
              if(result){
                  
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
const excluirClassificacao = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

    let resultBuscarClassificacao = await buscarClassificacao(id)
    if(resultBuscarClassificacao.status) {

        if (resultBuscarClassificacao) {

            result = await classificacaoDAO.deleteClassificacao(id)

            if(result)
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                return customMessage.DEFAULT_MESSAGE

        } else {
            return customMessage.DEFAULT_MESSAGE
        }

    } else {
        return resultBuscarClassificacao
    }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }

}
const validarDados = async function (classificacao) {
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    if(classificacao.classificacao == undefined || classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao.length > 10){
        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}
const tratarDados = async function (classificacao) {

    classificacao.classificacao = classificacao.classificacao.replaceAll("'","")

    return classificacao
}

module.exports = {
    inserirClassificacao,
    listarClassificacao,
    atualizarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}
