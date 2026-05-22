/***************************************************************
 * Objetivo:Arquivo responsavel pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data:17/04/2026
 * Autor:Evellyn
 * Versão:1.0
 ******************************************************************/
//Import do arquivo de configurações de mensagens do projeto
const configMessagens = require('../modolo/configMenssagens.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme.genero.js')

//Import das Controllers
const controllerClassificacao = require('../classificacao/controller_classificacao.js')

//Função para inserir novo filme
const inserirNovoFilmeGerero = async function(filmeGenero){



        //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
        let customMessage = JSON.parse(JSON.stringify(configMessagens))
        
        try {
        

                let validar = await validarDados(genero)


                //Retorna um JSON de erro caso algum atributo seja inválido,
                //senão retorna um false (Não teve erro)
                if(validar){
                return validar //400

                }else{
                //Encaminha os dados do Filme para o DAO inserir no BD
                    let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                    if(result){ //201

                        //Cria o ID no JSON do filme e adiciona o ID gerado no DAO
                        filmeGenero.id = result

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero

                        return customMessage.DEFAULT_MESSAGE//201

                    }else{ //erro 500
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }

        } catch (error) {
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
        }{


    }
}

//Função para atualizar um filme existente
const atualizarFilmeGenero = async function(filmGenero,id){

    let customMessage = JSON.parse(JSON.stringify(configMessagens))

    try {
        // Validando o content type, para saber se é um JSON que está sendo enviado.
       

            //Chama a função para buscar o filme e validar se o id está correto
            // Se o ID existe no Banco de Dados e se o filme existe.
            let resultBuscarFilmeID = await buscarFilmeGenero(id)
            if (resultBuscarFilme.status) {
                
                // Validando se JSON está chegando corretamente.
                if (resultBuscarFilmeGenero) {

                    // Chama a função para validar os dados dos Filmes para ver se estão corretos
                    let validar = await validarDados(filmeGenero)
                    if (!validar) {

                        // Adiciona um atributo id no JSON de filme, para enviar para o DAO um único objeto, 
                        // ja que o body iria mandar os dois de formas separados para o DAO.
                        filmeGenero.id = Number(id)

                        // Chama a função para atualizar o filme no banco de dados.
                        let result = await filmeGeneroDAO.updateFilmeGenero(filmenero)
                        if (result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = filmeGenero
                            return customMessage.DEFAULT_MESSAGE //RETORNA 200

                        } else {
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                        }


                    } else { // fecha if sobre a validação
                        return validar // RETORNA 400 DA VALIDAÇÃO DOS CAMPOS DO BANCO DE DADOS!
                    }

                } else { // fecha if sobre o buscarFilme(campos obrigatórios)
                    return customMessage.ERROR_BAD_REQUEST // RETORNA 400
                }


            } else { //fecha if o buscarFilme(id)
                return resultBuscarFilme // RETORNA 400(ID INVÁLIDO) ou 404(NÃO ENCONTRADO) ou 500(MODEL OU CONTROLLER)
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500 (CONTROLLER) 
    }


}

//Função para retornar todos os filmes existentes
const listarFilmesGenero = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessagens))

    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeGeneroDAO.selectAllFilmeGenero()
        
        //Validação para verificar se o DAO consegui processar o script no BD
        if(result){
            //Validação para verificar se o conteúdo do array tem dados de
            // retorno ou se esta vazio
            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme.genero = result

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
const buscarFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessagens))


    //Validação para garantir que o ID seja um número válido
    try {
        if(String (id).replaceAll(' ', '' ) == '' || id  == null || id == undefined || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        }else{
            //Chama a função do do DAO para pesquisar o filme pelo ID
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            //Validação para verificar se o DAO retornou dados ou FALSE(erro)
            if(result){
                //Validação para verificar se o DAO tem algum dado no Array
                    if(result.length > 0){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filmeGenero = result

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
//Função para buscar os generos filtrando pelo ID do filme
const buscarGenerosIdFilme = async function(idFilme){

    let customMessage = JSON.parse(JSON.stringify(configMessagens))


    //Validação para garantir que o ID seja um número válido
    try {
        if(String (id).replaceAll(' ', '' ) == '' || idFilme  == null || idFilme == undefined || isNaN(idFilme) || idFilme <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        }else{
            //Chama a função do do DAO para pesquisar o filme pelo ID
            let result = await filmeGeneroDAO.selectGeneroByIdGenero(idFilme)

            //Validação para verificar se o DAO retornou dados ou FALSE(erro)
            if(result){
                //Validação para verificar se o DAO tem algum dado no Array
                    if(result.length > 0){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filmeGenero = result

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

const buscarFilmeIdFilme = async function(idFilme){

    let customMessage = JSON.parse(JSON.stringify(configMessagens))
    if(filmeGereno.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || filmeGenero.id_genero.length > 80 || isNaN(filmeGereno.id_genero) || filmeGereno.id_genero <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
}

//Função para excluir um filme
const excluirFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessagens))

    try {
        //Chama a função de buscar filme para validar se o filme existe
       let resultBuscarID = await buscarFilmeGenero(id)
       if(resultBuscarID.status){

        if (resultBuscarFilme) {

            let result = await filmeGeneroDAO.deleteFilmeGenero(id)
            
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
const validarDados = async function(filmeGenero){

     //Criar uma copia dos JSON do arquivo de cofiguração de mensagem
     let customMessage = JSON.parse(JSON.stringify(configMessagens))

    if(filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined || filmeGenero.id_filme.length > 80 || isNaN(filmeGereno.id_filme) || filmeGereno.id_filme <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST


    }else if(filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || filmeGenero.nome.length > 80 || isNaN(filmeGereno.id_filme) || filmeGereno.id_filme <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }
    
    
    else{
        
        return false
    }

}

const tratarDdados = async function (filme) {
    //
    filme.nome = filme.nome.replaceAll("'","")
    filme.sinopse = filme.sinopse.replaceAll("'","")
    filme.capa = filme.capa.replaceAll("'","")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'","")
    filme.duracao = filme.duracao.replaceAll("'","")
    filme.valor = filme.valor.replaceAll("'","")
    filme.avaliacao = filme.avaliacao.replaceAll("'","")

    return filme
}

module.exports = {
    inserirNovoFilmeGerero,
    atualizarFilmeGenero,
    listarFilmesGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    tratarDdados,
    buscarGenerosIdFilme,
    buscarFilmeIdFilme
}