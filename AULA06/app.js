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

app.post('/v1/senai/locadora/filme', bodyParserJson, async function(request, response){
    let dados = request.body

//Recebendo o tipo de dados requisição para validar se é JSON
    let contentType = request.headers['content-type']

    console.log(request.headers)

    //Chama a funçãode inserir e encaminha os dados do filme e o contetType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})