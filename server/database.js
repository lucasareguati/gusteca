var Sequelize = require('sequelize');

//Conexión de sequelize con Postgres

const sequelize = new Sequelize('postgres://postgres:39842189@localhost:5432/gustekadb');

//Autenticacion 
sequelize.authenticate().then(()=>{
    console.log('Conexion creada con exito');   
}).catch(err => {
    console.error('error en conexion con db: ', err);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
