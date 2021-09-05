const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs','root','123456',{
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("conectou");
}).catch(function(erro){
    console.log("Falha ao se conectar "+erro);
})