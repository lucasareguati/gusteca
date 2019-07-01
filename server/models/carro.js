const { Sequelize, sequelize } = require('../database');

const carro = sequelize.define('carro',{
    id_carrito:{
         type: Sequelize.INTEGER,
         primaryKey: true,
    },
    id_usuario:{
        type: Sequelize.INTEGER,
        primaryKey: true,

    },
    comprado:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
    // total: Sequelize.REAL
},{
    tableName: "carro",
    timestamps: false
});


module.exports = carro;