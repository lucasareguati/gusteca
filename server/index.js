const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const {sequelize} = require('./database');
var bodyParser = require('body-parser');
const coockieParser = require('cookie-parser');
var mercadopago = require('mercadopago');

var app = express(); 

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-1686486541355749-072014-7f2ac63fa50351d3d7ef25ec90cc85f7-453783989'
    //access_token: 'TEST-6124557294272663-071223-4f7d26b711f2c947cd8ef461926ce4c3-208611113'
});


sequelize.query('CREATE VIEW usuarioConsulta as SELECT con.id_consulta, cli.nombre_usuario, pl.id_platillo FROM consulta con, cliente cli, platillo pl WHERE cli.id_usuario = con.id_usuario and con.id_platillo = pl.id_platillo');
sequelize.query('CREATE VIEW carritoCarro as SELECT carrito.id_carrito, pl.imagen, carrito.cantidad, carrito.activo, pl.linea, pl.modelo, pl.diametro, pl.precio, cliente.email FROM platillo pl, carrito, carro, cliente WHERE cliente.id_usuario = carro.id_usuario and carro.id_carrito = carrito.id_carrito  and pl.id_platillo = carrito.id_platillo');

sequelize.query(`CREATE VIEW factura as select cliente.nombre, compra.id_compra, pl.modelo, pl.linea, pl.diametro, carrito.cantidad, pl.precio from platillo pl, carro, carrito, compra, cliente where compra.id_usuario = cliente.id_usuario and compra.id_carro = carro.id_carro and carro.id_carrito = carrito.id_carrito and pl.id_platillo = carrito.id_platillo and compra.estado = 'Pagado'`);

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Settings
app.set('port', process.env.PORT || 3000 );
app.set(express.json());


//Middlewares
app.use(morgan('dev'));
app.use(coockieParser());



//Routes
app.use('/platillo', require('./routes/platillo.routes'));
app.use('/usuario', require('./routes/cliente.routes'));
app.use('/consulta', require('./routes/consulta.routes'));
app.use('/carrito', require('./routes/carrito.routes'));
app.use('/carro', require('./routes/carro.routes'));
app.use('/compra', require('./routes/compra.routes'));


app.listen(app.get('port') , () => {
    console.log('Server on port ' + app.get('port'));
});


/* Vendedor
{"id":453783989,
"nickname":"TESTOUKLWSKP",
"password":"qatest7826",
"site_status":"active",
"email":"test_user_58621258@testuser.com"} */

/* Comprador
{"id":453785597,
"nickname":"TESTIZ4T6P5X",
"password":"qatest5984",
"site_status":"active",
"email":"test_user_65312995@testuser.com"} */