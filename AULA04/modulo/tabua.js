/*
Objetivo: Arquivo responsavel por gerar uma tabuada utilizando WHILE e FOR
Data: 25/02/2026
Autor:Evellyn 
Versão: 1.0
*/

//Import da biblioteca de
const calculosMatematicos = require('./calculos')
//Função para imprimir a tabuada
const gerarTabuadaWhile = function(tabuada){
    let tab = Number(tabuada)
    let cont = 0
    let resultado

    while(cont <= 10){
    //Processamento
    resultado = calculosMatematicos.multiplicar(tab,cont)
    console.log(tab + 'x' + cont + '=' + resultado)
    cont + cont + 1
    }

}
// gerarTabuadaWhile(5)



const gerarTabuadaFor = function(tabuada){
    let tab = Number(tabuada)
    let resultado

    for(cont = 0; cont<=10;cont++){
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab,cont)
        console.log(tab + 'x' + cont + '=' + resultado)
    }

}
gerarTabuadaFor(5)
