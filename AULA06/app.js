//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização
const bodyParserJson = bodyParser.json()

const app = express()

const corsOptions = {
    origin: ['*'], 
    methods: 'GET', 
    allowedHeaders: ['Content-type', 'Authorization']
}

app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerGenero = require('./controller/gerero/controller_genero.js')

app.post('/v1/senai/locadora/filme', bodyParserJson, async function(request, response){
    let dados = request.body

//Recebendo o tipo de dados requisição para validar se é JSON
    let contentType = request.headers['content-type']


    //Chama a funçãode inserir e encaminha os dados do filme e o contetType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    console.log(result)
    response.status(result.status_code)
    response.json(result)

})

// FILME

app.get('/v1/senai/locadora/filme',async function(request, response){

    let result = await controllerFilme.listarFilmes()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atualizar um filme
app.put('/v1/senai/locadora/filme/:id', bodyParserJson, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request,response) {
    let id = request.params.id

    let result = await controllerFilme.excluirFilmes(id)

    response.status(result.status_code)
    response.json(result)
})



// LOCADORA

app.post('/v1/senai/locadora/classificacao', bodyParserJson, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirClassificacao(dados,contentType)
    
    response.status(result.status_code)

    response.json(result)
    
})

app.get('/v1/senai/locadora/classificacao',async function(request, response){
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/clasificacao/:id', bodyParserJson, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    
    // Chama a função para atualizar o filme.
    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/classificacao/:id', async function (request,response) {
    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// GÊNERO

app.post('/v1/senai/locadora/genero', bodyParserJson, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirGenero(dados, contentType)
    
    response.status(result.status_code)

    response.json(result)
    
})

app.get('/v1/senai/locadora/genero',async function(request, response){
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJson, async function(request, response) {

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

app.delete('/v1/senai/locadora/genero/:id', async function (request,response) {
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})




app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})