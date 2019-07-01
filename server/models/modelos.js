//DEFINIENDO MODELOS CON SEQUELIZE
const compra = sequelize.define('compra',{
    id_compra:{
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    id_carro: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER,
    fechacompra: Sequelize.DATE,
    horacompra: Sequelize.INTEGER
},{
    tableName: "compra",
    timestamps: false
});


const carro = sequelize.define('carro',{
    id_carro:{
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    id_carrito: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER,
    total: Sequelize.REAL
},{
    tableName: "carro",
    timestamps: false
});

const carrito = sequelize.define('carrito', {
    id_carrito:{
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    id_platillo: Sequelize.INTEGER,
    cantidad: Sequelize.INTEGER
},{
    tableName: "carrito",
    timestamps: false
});

const consulta = sequelize.define('consulta',{
    id_consulta:{
        primaryKey: true,
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




//Exportación de objetos


module.exports.compra = compra;


module.exports.consulta = consulta;

module.exports.carrito = carrito;

module.exports.carro = carro;