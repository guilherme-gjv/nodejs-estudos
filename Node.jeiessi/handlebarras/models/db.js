const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'root', '123456', {
    host: "localhost",
    dialect: 'mysql'
})//rotas

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}