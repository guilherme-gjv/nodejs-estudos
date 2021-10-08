const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => { //NÃO ESTÁ VALIDANDO T-T
    var erros = []

    if (typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "nome inválido" })
    }
    if (typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "e-mail inválido" })
    }
    if (typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "senha inválida" })
        console.log("senha invalida");
    }
    if (req.body.senha.length < 4) {
        erros.push({ texto: "senha curta" })
        console.log("senha curta");
    }
    if (req.body.senha2 != req.body.senha) {
        erros.push({ texto: "senhas incompatíveis" })
        console.log("senhas incompativeis");
    }

    if (erros.length > 0) {
        res.render("usuarios/registro", { erros: erros })
        console.log("erros detectados");
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "E-mail já cadastrado")
                res.redirect("/usuarios/registro")
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Erro ao salvar usuário")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash;

                        novoUsuario.save().then(()=>{
                            req.flash("success_msg", "Usuário criado com sucesso")
                            res.redirect("/")
                        }).catch((err)=>{
                            req.flash("error_msg", "Algo de errado! Tente novamente")
                            res.redirect("/usuarios/registro")
                        })

                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "erro interno")
            res.redirect("/")
        })
    }
})

module.exports = router