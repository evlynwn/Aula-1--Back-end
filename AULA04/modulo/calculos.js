/**
 * Objetivo: Arquivo responsavel pelo processamento de cálculos matemáticos (resultador,
 * Substituir,Multiplicar,Dividir)
 * Data:20/02/2026
 * Versão: 1.0
 */
//toLower -> retomar uma string em minusculo
//toUpperCase -> retomar um string em maiusculo

//exemplo de função anônima

// função para calculcar as 4 operações matemáticas
const calculcar = function(numero1,numero2,operador){
    //Entrada de dados
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()

    let resultado = false

    //Processamento
    //if(operadorMatematico == 'SOMAR')
    //     resultado = valor1 + valor2
    // }else if(operadorMatematico == 'SUBTRAIR'){
    //      resultado = valor1 + valor2
    // }else if(operadorMatematico == 'DIVIDIR'){
    //      if(valor2 != 0)
    //      resultado = valor1 / valor2
    // }else if(operadorMatematico == 'MULTIPLICADOR'){
    //      resultado = valor1 * valor2 
    // }

    switch(operadorMatematico) {
        case 'SOMAR':
            resultado = somar(valor1,valor2)
            break;
        case 'SUBTRAIR' :
            resultado = subtrair(valor1,valor2)
            break;
        case 'DIVIDIR' :
            resultado = dividir(valor1,valor2)
            break;
        case 'MULTIPLICADOR' :
            resultado = multiplicador(valor1,valor2)
            break;


    }

    //Saída
    return resultado
}

const somar = (valor1,valor2) => Number
const multiplicar = (valor1,valor2) => Number(valor1) * Number(valor2)

module.exports ={
    multiplicar
}