const configMessagens = require('../modolo/configMenssagens.js')
const atorDAO = require('../../model/DAO/ator/ator.js')
const controllerAtor = require('../ator/controller_ator.js')

const inserirAtor = async function(ator, contentType){

        let customMessage = JSON.parse(JSON.stringify(configMessagens))
        
        try {
            
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                console.log(contentType)
            
                let validar = await validarDados(ator)

                 if(!validar){
                                let result = await atorfiaDAO.inserirAtor(await tratarDados (ator))
                
                                if(result){
                
                                    ator.id = result
                
                                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                                    customMessage.DEFAULT_MESSAGE.response = ator
                
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
                
const listarAtor = async function () {
                
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))
                
        try {
                
        let result = await atorDAO.selectAllAtor()
                
            if(result){
                
                if(result.length > 0){
                
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.atorDAO = result
                
                return customMessage.DEFAULT_MESSAGE
                                
                }else{
                return customMessage.ERROR_NOT_FOUND
                }
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
                        
                } catch (error) {
                return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
                        
                    }
                    
                }
                
const atualizarAtor = async function () {
                
                    let customMessage =JSON.parse(JSON.stringify(configMenssagens))
                
                    try {
                        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                
                            let resultBuscarAtor = await buscarAtor(id)
                            if(resultBuscarAtor.status){
                
                                if(resultBuscarAtor){
                
                                    let validar = await validarDados(ator)
                                    if(!validar){
                
                                        ator.id = Number(id)
                
                                        let result = await atorDAO.updateAtor(await tratarDados(ator))
                                        if(result) {
                
                                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                                            customMessage.DEFAULT_MESSAGE.response = ator
                
                                            return customMessage.DEFAULT_MESSAGE
                
                
                                        }else {
                                            return customMessage.ERROR_INTERNAL_SERVER_MODEL
                                        }
                                    }else{
                                        return validar
                                    }
                                }else {
                                    return customMessage.ERROR_BAD_REQUEST
                                }
                            }else{
                                return resultBuscarAtor
                            }
                        }else{
                            return customMessage.ERROR_CONTENT_TYPE
                        }
                        
                    } catch (error) {
                
                        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
                    }
                    
                }
const buscarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))
                
        try {
            if(String (id).replaceAll(' ', '' ) == '' || id  == null || id == undefined || isNaN(id)){
                                  customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
                                  return customMessage.ERROR_BAD_REQUEST 
                      
                            }else{
                                  
                                  let result = await AtorDAO.selectByIdAtor(id)
                      
                                  if(result){
                                      
                                          if(result.length > 0){
                                              customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                                              customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                                              customMessage.DEFAULT_MESSAGE.response.ator = result
                      
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
const excluirAtor = async function (id) {
                
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))
                
        try {
                
        let resultBuscarAtor= await buscarAtor(id)

            if(resultBuscarAtor.status) {
                
                if (resultBuscarAtor) {
                
                result = await AtorDAO.deleteAtor(id)
                
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
const validarDados = async function (ator) {
                    let customMessage = JSON.parse(JSON.stringify(configMenssagens))
                
                    if(ator.ator == undefined || ator.ator == '' || ator.ator == null || ator.ator.length > 10){
                        customMessage.ERROR_BAD_REQUEST.field = '[ATOR] INVÁLIDO'
                        return customMessage.ERROR_BAD_REQUEST
                    } else {
                        return false
                    }
}
const tratarDados = async function (ator) {
                
    ator.ator = ator.ator.replaceAll("'","")
                
    return ator
}
module.exports = {
    inserirAtor,
    listarAtor,
    atualizarAtor,
    buscarAtor,
    excluirAtor                    
}