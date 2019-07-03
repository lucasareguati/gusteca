const { Sequelize, sequelize } = require('../database');

const carro = sequelize.define('carro',{
    id_carro:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_carrito: Sequelize.INTEGER,        
    id_usuario: Sequelize.INTEGER,
    comprado:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
},{
    tableName: "carro",
    timestamps: false
});


module.exports = carro;