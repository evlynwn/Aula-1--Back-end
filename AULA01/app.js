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
//Permite a entrada de dados do nome do usuario
//question -> ultiliza uma função de CALLBACK para devolver o valor digitado
//CALLBACK -> É uma função particular de um metodo, que é chamado para 
// encaminhar um conteudo para o desenvolvedor, esse conteudo vem atraves da 
// variavel no argumento "nomeUsuario"



entradaDeDados.question("Digite seu nome:", function(nomeUsuario){
    console.log("O nome digitado foi: " + nomeUsuario)

    entradaDeDados.question("Digite seu email: ", function(emailUsuario){
        console.log(`O email do usuario   ${nomeUsuario} é ${emailUsuario}`  )
    })
})