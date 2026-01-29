/*
Objetivo: Projeto para realizar  o calculo de média escolar 
Autor: Evellyn
Data: 29/01/2026
Versão: 1.0
*/

/* 
    Tipos de criação de variaveis

    var -> Permite criar um espaço de memoria do tipo variável.
        Essa forma de crição hoje é considerada mais antiga, 
        é provavel que seja encontrada em projetos mais antigos.
        Dica:Caso você precise ultilizar o var, recomenda-se que
        seja ultilizado apenas em escopo global.

    let -> Permite criar um espaço em memoria do tipo variavel.
        Essa forma de criação é realizada somente no espaço local, ou seja,
        dentro de bloco de programação { }. esse tipo de variavel deixa de existir
        ao termino do bloco.

    conset -> Permite criar um espaço memoria do tipo constante,ou seja,
        esse conteudo não poderá sofrer mudanças durante o projeto.
        Dica: Se possível você pode esse const escrita em
        MAIUSCULO para facilitar a sua ultilização. Pode ser criada de forma local ou glogal.

    Operadores de comparação

        == -> Permite a comparação de dois conteúdos
        != -> Permite comparar a diferença de dois conteúdos
        <  -> Permite validar o valor menor
        >  -> Permite validar o valor maior
        <= -> Permite validar se o valor é menor ou igual
        >= -> Permite validar se o valor é maior ou igual
        ===-> Permite comparar a igualdade dos conteudos e a igualdade de tipagem de dados
        !==-> Permite comparar a diferença de conteudos e a igualdade de tipagem de dados
        =!=-> Permite comparar a igualdade de conteudos e a diferença de tipagem de dados

        Tipos de operadores lógicos
            E  -> AND -> &&
            OU -> OR  -> ||
            NÃO-> NO -> !

*/
//Important da biblioteca de entrada de dados
const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout

})
//Entrada de dados do nome
entradaDeDados.question('Digite o nome do aluno:', function(nome){
    //Recebe o nome do aluno
    let nomeAluno = nome

    //
    entradaDeDados.question('Digite a nota1', function(valor1){
        let nota1 = valor1

        //
        entradaDeDados.question('Digite a nota2:', function(valor2){
            let nota2 = valor2

            //
            entradaDeDados.question('Digite a nota3', function(valor3){
                let nota3 = valor3

                //
                entradaDeDados.question('Digite a nota4:', function(valor4){
                    let nota4 = valor4

                    if(nomeAluno =='' || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == ''){
                        console.log('ERRO: Existem campos obrigatórios que não foram preenchidos')

                    //Validação de entrada de numero apenas entre 0 até 100
                    }else if(nota1<0 || nota1>100 || nota2<0 || nota2 >100 || nota3<0 || nota3>100 || nota4<0 || nota4>100){
                        console.log('ERRO: Somente são possíveis valores entre 0 até 100')
                        }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                            console.log('ERRO: Somente numeros são permitidos na entrada das notas')
                        }
                        
                })//Fecha nota4
            })//Fecha nota3
        })//Fecha nota2
    })//Fecha nota1
})//Fecha nome