const configMenssagens = require('../modulo/configMenssagens.js')
const cargoDAO = require('../../model/DAO/cargo/cargo.js')
const controllerCargo = require('../cargo/controller_cargo.js')

const inserirCargo = async function(cargo, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(cargo)

            if(!validar){

                let result = await cargoDAO.inserirCargo(await tratarDados(cargo))

                if(result){

                    cargo.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = cargo

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

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarCargo = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        let result = await cargoDAO.selectAllCargo()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.cargo = result

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

const atualizarCargo = async function(id, cargo, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarCargo = await buscarCargo(id)

            if(resultBuscarCargo.status){

                let validar = await validarDados(cargo)

                if(!validar){

                    cargo.id = Number(id)

                    let result = await cargoDAO.updateCargo(await tratarDados(cargo))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = cargo

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarCargo
            }

        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarCargo = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        if(String(id).replaceAll(' ','') == '' || id == null || id == undefined || isNaN(id)){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await cargoDAO.selectByIdCargo(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.cargo = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirCargo = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {

        let resultBuscarCargo = await buscarCargo(id)

        if(resultBuscarCargo.status){

            let result = await cargoDAO.deleteCargo(id)

            if(result){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_DELETED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_DELETED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_DELETED_ITEM.message

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarCargo
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validarDados = async function(cargo){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    if(cargo.cargo == undefined || cargo.cargo == '' || cargo.cargo == null || cargo.cargo.length > 100){

        customMessage.ERROR_BAD_REQUEST.field = '[CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else{
        return false
    }

}

const tratarDados = async function(cargo){

    cargo.cargo = cargo.cargo.replaceAll("'", "")

    return cargo

}

module.exports = {
    inserirCargo,
    listarCargo,
    atualizarCargo,
    buscarCargo,
    excluirCargo
}