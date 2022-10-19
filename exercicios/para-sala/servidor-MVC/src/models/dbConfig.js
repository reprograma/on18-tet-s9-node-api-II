function bancoDeDados(dado){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (dado == "series"){
                return resolve( require("./series.json"))
            }
            else if(dado == "filmes"){
                return resolve(require("./filmes.json"))
            }
            else{
                return reject("Dado não encontrado")
            }
            
        }, 1500);
    })
}
//vai exportar: Isso permite que todo mundo da pasta src posa acessar o banco de dados.
module.exports ={
    bancoDeDados
}