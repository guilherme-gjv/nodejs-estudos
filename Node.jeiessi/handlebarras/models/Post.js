const db = require('./db');

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.TEXT
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

//comando necessario apenas UMA vez:
//Post.sync({force: true})

module.exports = Post