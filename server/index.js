const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {sequelize} = require('./database');
var bodyParser = require('body-parser');
const coockieParser = require('cookie-parser');
var mercadopago = require('mercadopago');

var app = express(); 

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-6124557294272663-071223-4f7d26b711f2c947cd8ef461926ce4c3-208611113'
});


app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));


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

