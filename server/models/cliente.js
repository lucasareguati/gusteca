const { sequelize, Sequelize } = require('../database');

const cliente = sequelize.define('cliente',{
    id_usuario:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nombre_usuario: Sequelize.TEXT,
    nombre: Sequelize.TEXT,
    contrasenia: Sequelize.TEXT, 
    codigopostal: Sequelize.TEXT,
    dni: Sequelize.INTEGER,
    email: Sequelize.TEXT,
    tel: Sequelize.INTEGER    
},{
    tableName: "cliente",
    timestamps: false    
});


module.exports = cliente;
