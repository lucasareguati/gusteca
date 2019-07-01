const { sequelize, Sequelize } = require('../database');


const consulta = sequelize.define('consulta',{
    id_consulta:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_usuario: Sequelize.INTEGER,
    id_platillo: Sequelize.INTEGER,
    consulta: Sequelize.TEXT,
    fecha: Sequelize.DATEONLY,
    respuesta: Sequelize.TEXT
},{
    tableName: "consulta",
    timestamps: false
});

module.exports = consulta;