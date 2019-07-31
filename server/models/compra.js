const { sequelize, Sequelize } = require('../database')

const compra = sequelize.define('compra',{
    id_compra:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_carro: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER,
    id_preference: Sequelize.STRING,
    id_order: Sequelize.INTEGER,
    estado: Sequelize.STRING,
    fechacompra: Sequelize.INTEGER,
    horacompra: Sequelize.TIME,
    total: Sequelize.INTEGER
},{
    tableName: "compra",
    timestamps: false
});



module.exports = compra;