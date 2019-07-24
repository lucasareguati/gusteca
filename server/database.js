var Sequelize = require('sequelize');

//Conexión de sequelize con Postgres

const url = process.env.DATABASE_URL || 'postgres://postgres:39842189@localhost:5432/gustekadb';
const sequelize = new Sequelize(url);

//Autenticacion 
sequelize.authenticate().then(()=>{
    console.log('Conexion creada con exito');   
}).catch(err => {
    console.error('error en conexion con db: ', err);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
