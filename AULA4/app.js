function removerItem (nomeAluno){
    let cont = 0
    let qtd = listaDeAlunos.length
    while(cont < qtd){
        if(nomeAluno == listaDeAlunos[cont])
            listaDeAlunos.splice(cont,1)
    }
}