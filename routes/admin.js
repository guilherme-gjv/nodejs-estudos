const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categoria = require("../models/Categoria")


router.get('/', (req, res) => {
    res.render('admin/index')
});

router.get('/posts', (req, res) => {
    res.send("Posts");
})

router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
        res.render("admin/categorias", { categorias: categorias })
    }).catch((err) => {
        res.flash("error_msg", "houve um erro ao listar as categorias ")
        res.redirect("/admin");
    })

})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
})

router.post('/categorias/nova', (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido!" })
    }

    if (!req.body.slug || typeof req.body.nome == undefined || req.body.slug == null) {
        erros.push({ texto: "slug inválido" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria inválido" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", 'Categoria criada')
            console.log("Categoria criada")
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria: ' + err)
            res.redirect('/admin')

        })
    }

})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne( { _id: req.params.id }).lean().then((categoria) => {
        res.render("admin/editcategorias", { categoria: categoria })

    }).catch((err) => {
        req.flash("error_msg", "esta categorias não existe")
        console.log("erro na edição: ", err);
        return res.redirect("/admin/categorias")
    })

})

router.post('/categorias/edit', (req, res) => {
    Categoria.findOne({ _id: req.body.id }).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug 

        categoria.save().then(()=>{
            req.flash("success_msg", "Categoria editada!")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg","Erro ao salvar categoria!")
            res.redirect("/admin/categorias")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar categoria!")
        console.log("erro: ",err)
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar" , (req,res)=>{
    Categoria.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "categoria deletada com sucesso")
        res.redirect("/admin/categorias")
        console.log("categoria deletada")
    }).catch((err)=>{
        console.log("catch")
        req.flash("error_msg","houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req, res )=>{
    res.render("admin/postagens");
})

router.get("/postagens/add", (req, res )=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/addpostagens",{categorias: categorias});
        req.flash("success_msg", "postagem criada!")
    }).catch((err)=>{
        req.flash("error_msg", "houve um erro ao carregar o formulário categoria")
        res.redirect("/admin")
    })
    
})

module.exports = router;