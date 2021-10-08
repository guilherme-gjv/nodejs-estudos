//carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
//Body-parser foi descontinuado!!
//const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require("path")
const mongoose = require('mongoose');
const session = require("express-session")
const flash = require("connect-flash");
require("./models/Postagem")
const Postagem = mongoose.model("postagens");
require("./models/Categoria")
const Categoria = mongoose.model("categorias");
const usuario = require("./routes/usuario")


//configurações
    //session
    app.use(session({
        secret:"cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //middleware
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    })
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

app.get('/', (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens)=>{
        res.render("index", {postagens:postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Não foi possível carregar as postagens");
        res.redirect("/404");
    })
    
});

app.get("/postagem/:slug",(req,res)=>{
    Postagem.findOne({slug: req.params.slug}).lean().then((postagem)=>{
        if(postagem){
            res.render("postagem/index", {postagem: postagem});
        }else{
            req.flash("error_msg","Essa postagem não existe");
            res.redirect("/");
        }
    }).catch((err)=>{
        req.flash("error_msg","erro interno!")
        res.redirect("/")
    })
})

app.get("/categorias", (req,res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("categorias/index",{categorias:categorias})
    }).catch((err)=>{
        req.flash("error_msg", "erro ao listar categorias")
        res.redirect("/")
    })
})

app.get("/categorias/:slug", (req, res)=>{
    Categoria.findOne({slug: req.params.slug}).lean().then((categoria)=>{
        if(categoria){
            Postagem.find({categoria: categoria._id}).lean().then((postagens)=>{
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
            }).catch((err)=>{
                req.flash("error_msg","Não foi possível listar postagens");
            })
        }else{
            req.flash("error_msg", "essa categoria não existe")
        }
    }).catch((err)=>{
        req.flash("error_msg","erro interno");
        res.redirect("/")
    })
})

app.get("/404", (req,res)=>{
    res.send("Erro 404");
});
//rotas
app.use('/admin', admin)
app.use('/usuarios',usuario)
//outros
const PORT = 7777;
app.listen(PORT, () => { 
    console.log("servidor rodandoo hehe");
});
 