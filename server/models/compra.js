const { sequelize, Sequelize } = require('../database')

const compra = sequelize.define('compra',{
    id_compra:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_carro: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER,
    id_mercadopago: Sequelize.STRING,
    estado: Sequelize.STRING,
    fechacompra: Sequelize.DATE,
    horacompra: Sequelize.STRING,
    total: Sequelize.INTEGER
},{
    tableName: "compra",
    timestamps: false
});



module.exports = compra;