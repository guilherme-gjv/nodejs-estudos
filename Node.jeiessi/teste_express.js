const express = require("express");
const app = express();
var maior_pontuacao = 0;
app.use(express.json());

app.post ("/mudarpontuacao", (req,res)=>{
    const {pontuacao}= req.body;
    if(pontuacao > maior_pontuacao){
        maior_pontuacao = pontuacao;
    }
    console.log(req.body);
    console.log(maior_pontuacao);
    res.send(maior_pontuacao); 

})

app.get("/", function(req,res){
    res.sendFile(__dirname+"/exibirhtml/responsive-game.html");
});

app.get("/sobre", function(req, res){
    res.send("Sobre!!");
})

app.get("/inicial/:nome/:idade", function(req, res){
    
    res.send("idade do "+req.params.nome + " é "+req.params.idade);
    
})

//essa deve ser a última funcao do codigo.
app.listen(7775, function(){
    console.log("servidor roor");
})
  