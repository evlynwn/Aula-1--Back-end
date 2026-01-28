//Comentario em linha
/*
    Comentario 
        em
    Bloco

*/
//Permite exibir um conteúdo no terminal
console.log("Testando do JS")

//Permite a criação de uma variável
var nome = 'Evellyn'

//Concatenação de dados (texto e variavel)
console.log(nome)
console.log('O nome do usuario é:' + nome)
console.log(`O nome do usuario é: ${nome}`)

//Import da biblioteca de readline
//readline -> srve para permitir a entrada de dados via terminal
var readline = require("readline")

//Cria um objeto especialista em entrada de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Digite seu nome:", function(nomeUsuario){
    console.log("O nome digitado foi: " + nomeUsuario)

    entradaDeDados.question("Digite seu email: ", function(emailUsuario){
        console.log("O email do usuario  " ${nomeUsuario} é ${emailUsuario}  )
    })
})