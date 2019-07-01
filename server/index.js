const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {sequelize} = require('./database');

var bodyParser = require('body-parser');
const coockieParser = require('cookie-parser');


var app = express(); 



app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
// require('./config/passport')(passport);

//Settings
app.set('port', process.env.PORT || 3000 );
app.set(express.json());


//Middlewares
app.use(morgan('dev'));
app.use(coockieParser());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({
   // secret: 'gusteka',
   // resave: false,
   // saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());




//Routes
app.use('/platillo', require('./routes/platillo.routes'));
app.use('/usuario', require('./routes/cliente.routes'));
app.use('/consulta', require('./routes/consulta.routes'));
app.use('/carrito', require('./routes/carrito.routes'));
app.use('/carro', require('./routes/carro.routes'));

app.listen(app.get('port') , () => {
    console.log('Server on port ' + app.get('port'));
});

