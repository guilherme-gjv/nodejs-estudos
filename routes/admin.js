const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria.js')
const Categoria = require("../models/Categoria")

router.get('/', (req,res)=>{
    res.render('admin/index')
});

router.get('/posts', (req, res)=>{
    res.send("Posts");
})

router.get('/categorias', (req, res)=>{
    res.render("admin/categorias.handlebars");
})

router.post('categorias/nova',(req,res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log('categoria criada :)');
    }).catch((err)=>{
        console.log('erro ao criar categoria '+err);
    })
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategorias');
})

module.exports = router;