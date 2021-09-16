const mongoose = require("mongoose");
const internal = require("stream");
const Schema = mongoose.Schema;

const categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

mongoose.model("categorias",Categoria)
