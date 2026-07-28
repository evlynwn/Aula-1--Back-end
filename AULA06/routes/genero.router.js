const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

const controllerGenero = require('../controller/gerero/controller_genero.js')
const bodyParserJson = require('body-parser').json

router.post('/', bodyParserJson, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirGenero(dados, contentType)
    
    response.status(result.status_code)               

    response.json(result)
    
})

router.get('/',async function(request, response){
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request,response) {
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

//Export do objetivo de rotas de genero
module.express = router
