/*var Sequelize  = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs','root','123456',{
host: "localhost",
dialect: 'mysql'
})


const Pessoa = sequelize.define('pessoa',{
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    },
    saldo:{
        type: Sequelize.FLOAT
    }


})

Pessoa.create({
    nome: "joao neto",
    sobrenome: "da silva",
    idade: 25,
    email: "joaozinhogameplays@gmail.com",
    saldo: 503.75
})
Pessoa.create({
    nome: "luciene",
    sobrenome: "da costa",
    idade: 17,
    email: "lucienegamelokos@gmaiml.com",
    saldo: 570.50
})
//Pessoa.sync({force:true})

sequelize.authenticate().then(function(){
    console.log("conectou");
}).catch(function(erro){
    console.log("Falha ao se conectar "+erro);
})*/