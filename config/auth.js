const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//model de usuario
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email'}, (email, senha, donme)=>{
        Usuario.findOne({email:email}).then((usuario)=>{
            if(!usuario){
                return donme(null,false,{message:"esta conta não existe"})
            }
            bcrypt.compare(senha, usuario.senha,(erro, batem)=>{
                if(batem){
                    return done(null,user)
                }else{
                    return done(null,false,{message:"senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id,done)=>{
        Usuario.findById(id,(err,usuario)=>{
            done(err,user)
        })
    })
}