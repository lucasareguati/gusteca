const {sequelize, Sequelize } = require('../database');

const carrito = sequelize.define('carrito', {
    id_carrito: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_platillo: Sequelize.INTEGER,
    cantidad: Sequelize.INTEGER,
    activo:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
},{
    tableName:"carrito",
    timestamps: false
}); 

module.exports = carrito;