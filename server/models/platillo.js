const { sequelize, Sequelize } = require('../database');


const platillo = sequelize.define('platillo',{
    id_platillo:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    linea: Sequelize.TEXT,
    modelo: Sequelize.TEXT,
    aleacion: Sequelize.TEXT,
    diametro: Sequelize.TEXT,
    descripcion: Sequelize.TEXT,
    stock: Sequelize.INTEGER,
    precio: Sequelize.INTEGER,
    marca: Sequelize.TEXT,
    categoria: Sequelize.TEXT,
    imagen: Sequelize.TEXT,
    baja: Sequelize.BOOLEAN
},{
    tableName: "platillo",
    timestamps: false
});





module.exports = platillo;