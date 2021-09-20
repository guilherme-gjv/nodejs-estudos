//carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
//Body-parser foi descontinuado!!
//const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require("path")
const mongoose = require('mongoose');

//configurações
    //body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


    //handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));//
app.set('view engine', 'handlebars'); 
    //mongoose
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/blogapp").then(()=>{
mongoose.connect("mongodb://localhost/blogapp").then(()=>{
    console.log("conectado!");
}).catch((err)=>{
    console.log("deu erro! "+ err);
})
    //public
app.use(express.static(path.join(__dirname, 'public')))

//rotas
app.use('/admin', admin);

//outros
const PORT = 7777;
app.listen(PORT, () => { 
    console.log("servidor rodandoo hehe");
});
 