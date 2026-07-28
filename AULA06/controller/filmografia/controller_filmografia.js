const configMenssagens = require('../modolo/configMenssagens.js')
const filmografiaDAO = require ('../../model/DAO/filmografia/filmografia.js')
const controllerFilmografia  = require('../filmografia/controller_filmografia')

const inserirFilmografia = async function (filmografia, contentType) {
    
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATIN/JSON'){
            console.log(contentType)

            let validar = await validarDados(filmografia)

            if(!validar){
                let result = await filmografiaDAO.inserirFilmografia(await tratarDados (filmografia))

                if(result){

                    filmografia.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmografia

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

const listarFilmografia = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        let result = await filmografiaDAO.selectAllFilmografia()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filmografiaDAO = result

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

const atualizarFilmografia = async function () {

    let customMessage =JSON.parse(JSON.stringify(configMenssagens))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarFilmografia = await buscarFilmografia(id)
            if(resultBuscarFilmografia.status){

                if(resultBuscarFilmografia){

                    let validar = await validarDados(filmografia)
                    if(!validar){

                        filmografia.id = Number(id)

                        let result = await filmografiaDAO.updateFilmografia(await tratarDados(filmografia))
                        if(result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = filmografia

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
                return resultBuscarFilmografia
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
        
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}
const buscarFilmografia = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

      try {
              if(String (id).replaceAll(' ', '' ) == '' || id  == null || id == undefined || isNaN(id)){
                  customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
                  return customMessage.ERROR_BAD_REQUEST 
      
            }else{
                  
                  let result = await filmografiaDAO.selectByIdFilmografia(id)
      
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
const excluirFilmografia = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

    let resultBuscarFilmografia= await buscarFilmografia(id)
    if(resultBuscarFilmografia.status) {

        if (resultBuscarFilmografia) {

            result = await filmografiaDAODAO.deleteFilmografia(id)

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
const validarDados = async function (filmografia) {
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    if(filmografia.filmografia == undefined || filmografia.filmografia == '' || filmografia.filmografia == null || filmografia.filmografia.length > 10){
        customMessage.ERROR_BAD_REQUEST.field = '[FILMOGRAFIA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}
const tratarDados = async function (filmografia) {

    filmografia.filmografia = filmografia.filmografia.replaceAll("'","")

    return filmografia
}

module.exports = {
    inserirFilmografia,
    listarFilmografia,
    atualizarFilmografia,
    buscarFilmografia,
    excluirFilmografia
}