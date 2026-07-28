const configMenssagens = require('../modulo/configMenssagens.js')
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNacionalidade = async function(nacionalidade, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(nacionalidade)

            if(!validar){

                let result = await nacionalidadeDAO.inserirNacionalidade(await tratarDados(nacionalidade))

                if(result){

                    nacionalidade.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidade

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }

            }else{
                return validar
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarNacionalidade = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const atualizarNacionalidade = async function(id, nacionalidade, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarNacionalidade = await buscarNacionalidade(id)

            if(resultBuscarNacionalidade.status){

                let validar = await validarDados(nacionalidade)

                if(!validar){

                    nacionalidade.id = Number(id)

                    let result = await nacionalidadeDAO.updateNacionalidade(await tratarDados(nacionalidade))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = nacionalidade

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarNacionalidade
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarNacionalidade = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(id).replaceAll(' ','') == '' || id == null || id == undefined || isNaN(id)){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirNacionalidade = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        let resultBuscarNacionalidade = await buscarNacionalidade(id)

        if(resultBuscarNacionalidade.status){

            let result = await nacionalidadeDAO.deleteNacionalidade(id)

            if(result){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarNacionalidade
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function(nacionalidade){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    if(nacionalidade.nacionalidade == undefined ||
       nacionalidade.nacionalidade == '' ||
       nacionalidade.nacionalidade == null ||
       nacionalidade.nacionalidade.length > 100){

        customMessage.ERROR_BAD_REQUEST.field = '[NACIONALIDADE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    }else{
        return false
    }

}

const tratarDados = async function(nacionalidade){

    nacionalidade.nacionalidade = nacionalidade.nacionalidade.replaceAll("'", "")

    return nacionalidade

}

module.exports = {
    inserirNacionalidade,
    listarNacionalidade,
    atualizarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}