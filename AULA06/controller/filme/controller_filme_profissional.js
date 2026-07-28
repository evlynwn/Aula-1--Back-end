const configMenssagens = require('../modulo/configMenssagens.js')
const filmeProfissionalDAO = require('../../model/DAO/filme_profissional/filme_profissional.js')

const inserirFilmeProfissional = async function(filmeProfissional, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(filmeProfissional)

            if(!validar){

                let result = await filmeProfissionalDAO.insertFilmeProfissional(await tratarDados(filmeProfissional))

                if(result){

                    filmeProfissional.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeProfissional

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

const listarFilmeProfissional = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        let result = await filmeProfissionalDAO.selectAllFilmeProfissional()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filmeProfissional = result

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

const atualizarFilmeProfissional = async function(id, filmeProfissional, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarFilmeProfissional = await buscarFilmeProfissional(id)

            if(resultBuscarFilmeProfissional.status){

                let validar = await validarDados(filmeProfissional)

                if(!validar){

                    filmeProfissional.id = Number(id)

                    let result = await filmeProfissionalDAO.updateFilmeProfissional(await tratarDados(filmeProfissional))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeProfissional

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarFilmeProfissional
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarFilmeProfissional = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        if(String(id).replaceAll(' ','') == '' || id == null || id == undefined || isNaN(id)){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await filmeProfissionalDAO.selectByIdFilmeProfissional(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filmeProfissional = result

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

const excluirFilmeProfissional = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{

        let resultBuscarFilmeProfissional = await buscarFilmeProfissional(id)

        if(resultBuscarFilmeProfissional.status){

            let result = await filmeProfissionalDAO.deleteFilmeProfissional(id)

            if(result){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarFilmeProfissional
        }

    }catch(error){
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function(filmeProfissional){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    if(filmeProfissional.id_filme == undefined || filmeProfissional.id_filme == '' || filmeProfissional.id_filme == null || isNaN(filmeProfissional.id_filme)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }

    if(filmeProfissional.id_profissional == undefined || filmeProfissional.id_profissional == '' || filmeProfissional.id_profissional == null || isNaN(filmeProfissional.id_profissional)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }

    if(filmeProfissional.id_cargo == undefined || filmeProfissional.id_cargo == '' || filmeProfissional.id_cargo == null || isNaN(filmeProfissional.id_cargo)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }

    return false
}

const tratarDados = async function(filmeProfissional){
    return filmeProfissional
}

module.exports = {
    inserirFilmeProfissional,
    listarFilmeProfissional,
    atualizarFilmeProfissional,
    buscarFilmeProfissional,
    excluirFilmeProfissional
}