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

    let result = await controllerFilme.inserirNovoFilme(dados)

    response.status(result.status_code)
    response.json(result)

})
app.listen(8080, function(){
    console.log('API aguardando novas requisições...')
})