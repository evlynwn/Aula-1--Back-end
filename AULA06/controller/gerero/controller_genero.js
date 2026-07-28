const configMenssagens = require('../modolo/configMenssagens.js')

const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirGenero = async function (genero, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            console.log(contentType)

            let validar = await validarDados(genero)

            if(!validar){


                    let result = await generoDAO.insertGenero(await tratarDados(genero))
                    
                    if(result){
    
                        genero.id = result
    
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = genero
    
                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
            
                }else {
                    return validar
                }
            }else{
                return configMenssagens.ERROR_CONTENT_TYPE
            }
        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  
        }
}

const listarGenero = async function(){

     let customMessage  = JSON.parse(JSON.stringify(configMenssagens))
    
        try {
    
            let result = await generoDAO.selectAllGenero()
    
            if(result){
    
                if(result.length > 0){
    
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.count = result.length
                    customMessage.DEFAULT_MESSAGE.response.genero = result
    
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

const atualizarGenero = async function(genero, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarGenero = await buscarGenero(id)
            if (resultBuscarGenero.status) {

                if(resultBuscarGenero) {

                    let validar = await validarDados(genero)
                    if(!validar) {

                        genero.id = Number(id)

                        let result = await generoDAO.updateGenero(await tratarDados(genero))
                        if(result){

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = genero

                            return customMessage.DEFAULT_MESSAGE
                        }else{
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL
                        }

                        }else{
                            return validar
                        }
                    }else{
                        return customMessage.ERROR_BAD_REQUEST
                    }
                }else{
                    return resultBuscarGenero
                }
            }else {
                return customMessage.ERROR_CONTENT_TYPE
            }
        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

const buscarGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssagens))

try {
    if(String (id).replaceAll('','') ==''|| id ==null || id ==undefined || isFinite(id)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'

    }else{
        let result = await generoDAO.selectAllGenero(id)

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.genero = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.DEFAULT_MESSAGE
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    }
}catch (error){
    return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
}

}


const excluirGenero = async function(id){

      let customMessage = JSON.parse(JSON.stringify(configMessagens))
    
        try {
            //Chama a função de buscar filme para validar se o filme existe
           let resultBuscarFilme = await buscarGenero(id)
           if(resultBuscarFilme.status){
    
            if (resultBuscarFilme) {
    
                let result = await generoDAO.deleteGenero(id)
                
                if(result)
                    customMessage.DEFAULT_MESSAGE.status        = customMessage.SUCCESS_DELETED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code   = customMessage.SUCCESS_DELETED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message       = customMessage.SUCCESS_DELETED_ITEM.message
    
                return customMessage.DEFAULT_MESSAGE //200
    
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // Retorna 500
            }
    
           }else{
            return resultBuscarFilme // 400 ou 404
           }
        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Controller
            
        }
}

//Função para validar os dados de cadastro do Filme
const validarDados = async function(genero){

     //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
     let customMessage = JSON.parse(JSON.stringify(configMessagens))

    if(genero.genero == '' || genero.genero == null || genero.genero == undefined || genero.genero.length > 25){
        customMessage.ERROR_BAD_REQUEST.field = '[Gênero] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else{
        
        return false
    }

}

const tratarDdados = async function (genero) {
    //
    genero.genero = genero.genero.replaceAll("'","")


    return genero
}



module.exports = {
    inserirGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}