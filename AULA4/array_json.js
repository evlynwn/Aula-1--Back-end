/*
Objetivo:Manipular dados em ARRAY e JSON
Data:05/03/2026
Autor:Evellyn
Versão:1.0
*/


/*
    [] -> Representa um objeto do tipo ARRAY
    () -> Representa um objeto do tipo JSON

    Array -> É um espaço na memoria para armazenar dados sem a necessidade de criar outros objetos
        Ex:
            let nome = 'José'
            let nome = 'Marta'
            let nome = 'João'

                indices     0      1       2
            let nome = ['José', 'Maria', 'João']

    JSON -> É um espaço na memoria para armazenar dados CHAVE e VALOR
        Ex:
            let nome    = 'José'
            let telefone= '123456789'
            let email   = 'jose@gmail.com'

                            Atributo
                             Chave   Valor    Chave         Valor        Chave    Valor
            let cliente = ("nome: " "José",   "tefelone:"  "123456789"  "email"  "jose@gamil.com")

            */

//Criando objetos do tipo ARRAY
const listaDeAlunos       =['José','Maria','Luiz','Antonio','Carlos']
const listaDeCliente      =[]
const listaDeFornecedores =[]

const exibirDados = function(){

    //Exibe o objetivo ARRAY com o seu conteudo
    console.log(listaDeAlunos)

    //Exibindo o tipo
    console.log()

    //Exibe o objeto ARRAY em formato de tabela, mostrando indice e conteudo
    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    //Usando o While
    console.log('*******Exemplo com While*********')
    let cont = 0
    while(cont<listaDeAlunos.length){
        console.log(`O nome do aluno é:${listaDeAlunos[cont]}`)
        cont+=1 
    }

    //Usando o FOR
    console.log('******Exemplo com FOR EACH*******')
    for(let contador = 0; contador < listaDeAlunos.length; contador++){
        console.log(`O nome do Aluno é: ${listaDeAlunos[contador]}`)
    }

    //Usando o FOR EACH
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é:' ${aluno}`)
    })

    //Usando o FOR OF
    console.log('********Exemplo com FOR OF*********')
    for(aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)
    }

    //Usando o FOR IN
    console.log('********Exemplo com FOR IN*********')
    for (aluno in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[items]}`)
    }

    //Retorna a quantidade de lista de itens em um array
    console.log(listaDeAlunos.length)

}

//Adicionando elementos de forma manual pelo indice
const manipularDados = function(){
    listaDeCliente[0] = 'José da Silva'
    listaDeCliente[1] = 'Maria da Silva'
    listaDeCliente[2] = 'Luiz da Silva'
    listaDeCliente[3] = 'Ana da Silva'
    listaDeCliente[4] = 'Beatriz da Silva'

    console.log(listaDeCliente)

    //Permitir adicionar novos elementos no ARRY, sempre no Final
    listaDeFornecedores.push('Antonio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'José','André')

    console.log(listaDeFornecedores)


    //Permite adicionar novos elementos no ARRAY, sempre no INICIO
    //Após adicionar o elemento, ele reogarniza todos os items
    listaDeFornecedores.unshift('Luciano')

    console.table(listaDeFornecedores)

    //Permite adicionar um novo elemento em uma determinada posição do ARRAY
            // splice(indice, qtde de elemento a ser removido,'Novo conteudo')
    listaDeFornecedores.splice(3,0,'Bernado')

    console.table(listaDeFornecedores)

    //Permite remover um determinado conteudo com base no indice do
    //elemento do ARRAY
                    //splice(indice, qntd de elemento a ser removido)
    listaDeFornecedores.splice(6,2)
    console.log(listaDeFornecedores)
    //Permite remover o ultimo elemento do ARRAY
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    listaDeFornecedores.shift()
    console.log(listaDeFornecedores)

    
    
}

function removerItem(nomeAluno){

    //indexOf() => Retorna o indice referente ao conteúdo que esta sendo pesquisado
    listaDeAlunos.splice(listaDeAlunos.indexOf(nomeAluno),1)


    //for(cont in listaDeAlunos){
        //if(nomeAluno == listaDeAlunos[cont]){
            //listaDeAlunos.splice(cont,1)
        //}

    //let cont = 0
    //let qtd = listaDeAlunos.length
    //while(cont < qtd){
        //if(nomeAluno == listaDeAlunos[cont])
            //listaDeAlunos.splice(cont,1)
    //}
    //cont++
}

const verificarItem = function(nomeAluno){
    //Verifica se o conteúdo existe dentro do ARRAY e retorna(true/false)
    return listaDeAlunos.includes(nomeAluno)
}
const manipularDadosJSON = function(){
    //Criando um objeto JSON
        //A estrutura do JSON é Chave(atributo) : valor(conteudo)
    let aluno ={"id" : 1, "nome" :"José da Silva", "ra": 12345, "email": "jose@gmail.com"}

    //Exibe o objeto JSON
    console.log(aluno)
    console.table(aluno)

    //Exibe o conteúdo de um atributo de JSON
    console.log(aluno.nome)
    //console.log(aluno.email)

    //Adiciona um novo atributo do JSON já existente
    aluno.telefone = '011-98765432'
    aluno.data_nacimento = '10/05/200'

    // Remove um atributo do JSON
    delete aluno.email
    console.log(aluno)

}
const cadastroDeProdutos = function(){
    let cores =[
                    {"id" :1, "cor": "Branco",  "hexa": "#ffffff"},
                    {"id" :2, "cor": "Preto",   "hexa": "#000000"},
                    {"id" :3, "cor": "Azul",    "hexa": "#0000ff"},
                    {"id" :4, "cor": "Amarelo", "hexa": "#ffff00"},
                    {"id" :5, "cor": "Rosa",    "hexa": "#ffb5c0"},
                ]

    let marcas =[
                    {"id" :1, "marca": "Dell", "telefone": "11 9123456", "email": "llede@gmail.com"},
                    {"id" :2, "marca": "Apple", "telefone":"11 9876543", "email": "apee@gmail.com"},
                    {"id" :3, "marca": "LG", "telefone": "11 98765236", "email": "marLG@gmail.com"},
                    {"id" :4, "marca": "Positivo", "telefone": "11 98123456", "email": "posit@gmail.com"}
                ]
    let produtos =[
        {   "id": 1,
            "nome": "Monitor",
            "descricao": "Monitor de Polegadas",
            "valor":1500,
            "qtde": 20,
            "cor": [
                cores[0],
                cores[1]
            ],
            "marca":[
                marcas[1].marca
            ]
        },
        {   "id": 2,
            "nome":"Teclado",
            "descricao": "Teclado Mecanico RGB",
            "valor": 250,
            "qtde:": 500,
            "cor": cores,
            "marca": [
                marcas[1].marca,
                marcas[2].marca,
                marcas[3].marca
            ]
        },
        {  "id": 2,
            "nome":"Mouse",
            "descricao": "Mouse em fio",
            "valor": 80,
            "qtde:": 140,
            "cor": [
                cores[1],
                cores[2],
                cores[3]

            ],
            "marca": [
                marcas[1].marca,
                marcas[2].marca,
                marcas[3].marca
            ]

        }
    ]

    // console.log(produtos)
    // console.table(produtos)
    // console.log(produtos[0].cor)

    // produtos[0].cor.forEach(function(itemCor){
    //     console.log(itemCor.cor)
    // })

//console.log(cores[2].cor)
//cores.forEach(function(itemCor){
    //console.log(itemCor.cor)

                //})
                
    produtos.forEach(function(ItemProduto){
        console.log(`Produto: ${ItemProduto.nome}`)

        ItemProduto.cor.forEach(function(itemCor){
            console.log(`Cor: ${itemCor.cor}`)
        })

        ItemProduto.marca.forEach(function(ItemMarca){
            console.log(`Marca: ${ItemMarca}`)
        })
    })      
}
cadastroDeProdutos()




//manipularDadosJSON()


//console.log(verificarItem('José'))
//console.log(listaDeAlunos)
//removerItem('Maria')
//console.table(listaDeAlunos)
//exibirDados()