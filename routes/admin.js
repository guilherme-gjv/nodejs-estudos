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
    Categoria.find().lean().sort({date:'desc'}).then((categorias)=>{
        res.render("admin/categorias",{categorias: categorias})
    }).catch((err)=>{
        res.flash("error_msg", "houve um erro ao listar as categorias ")
        res.redirect("/admin");
    })
    
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

        //new Categoria(novaCategoria).save().then(()=>{
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", 'Categoria criada')
            //({ texto: "Nome da categoria inválido" })
            console.log('success_msg')
            console.log("criadaa")
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria: '+err)
            res.redirect('/admin')
            
        })
    }

})

router.get('/categorias/edit/:id',(req,res)=>{
    Categoria.findOne({where: {id: req.params.id}}).lean().then((categoria)=>{
        res.render("admin/editcategorias",{categoria:categoria})
    }).catch((err)=>{
        req.flash("error_msg", "esta categorias não existe")
        res.redirect("/admin/categorias")
    })
    
    res.render('admin/editcategorias')
} )

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
})

module.exports = router; 