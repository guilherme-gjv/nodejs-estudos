//carregando módulos
const express = require('express');
const handlebars = require('handlebars');
//Body-parser foi descontinuado!!
//const bodyParser = require('body-parser');
const app = express();
//const mongoose = require('mongoose');

//configurações
    //body-parser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        
    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    
    //mongoose
//rotas

//outros
const PORT = 7777;
app.listen(PORT, ()=>{
    console.log("servidor rodandoo hehe");
});
