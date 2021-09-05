
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Post = require('./models/Post');



//const Sequelize = require('sequelize');

// Config
//Template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//conexão com o banco de dados mysql

app.get('/', function (req, res) {
    // a função findall() era apenas all() na época do curso em dois mil e dezoito!!
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('home', { posts: posts })
    })
    //res.render('home')
})

app.get('/cad', function (req, res) {
    //res.send("cadastro de posts :v");
    res.render('formulario.handlebars');
});

app.post('/rotah', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/')
    }).catch(function (erro) {
        res.send("houve um erro" + erro);
    })
    //res.send("form recebido,texto é  " + req.body.titler + " conteudo:  " + req.body.conteudo);
})
    app.get('/deletar/:id', function (req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("postagem deletada com sucesso")
        }).catch(function(erro){
            console.log("deu erro: "+ erro);
        })
    })


//app.createServer().listen(5707,function(req,res){
//   console.log("oi");
//})

app.listen(5707, function () {
    console.log("servidor roodandoo");
});
