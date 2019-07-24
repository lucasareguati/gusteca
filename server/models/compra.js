const { sequelize, Sequelize } = require('../database')

const compra = sequelize.define('compra',{
    id_compra:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_carro: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER,
    id_order: Sequelize.INTEGER,
    estado: Sequelize.STRING,
    fechacompra:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW},
    horacompra: Sequelize.STRING,
    total: Sequelize.INTEGER
},{
    tableName: "compra",
    timestamps: false
});



module.exports = compra;