const mongoose = require ("mongoose");
//mongoose.Promise = global.Promise;
//não é mais necessário
mongoose.connect("mongodb://localhost/aprendendo",{
    useNewUrlParser:true
}).then(()=>{
    console.log("mongodb conectado :) ");
}).catch((erro)=>{
    console.log("houve um erro! "+erro);
});

//model - usuarios

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
})

mongoose.model('usuarios', UserSchema);

const Jorge = new mongoose.model('usuarios');


    new Jorge({
        nome: "Jorge",
        email: "joojgameplays@gmail.com",
        idade: 43,
        pais: "Angola"
    }).save().then(()=>{
        console.log("criou o usuario meu chapa");
    }).catch((erro)=>{
        console.log("houve um erro!! " + erro);
    })
 