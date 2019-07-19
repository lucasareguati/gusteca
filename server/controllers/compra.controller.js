const Compra = require('../models/compra');
const { sequelize, Sequelize } = require('../database');
var moment = require('moment');
var mercadopago = require('mercadopago');

const compraCtrl = {};

compraCtrl.getCodigo = async (req, res) => {
    const codigo = await sequelize.query(`SELECT id_mercadopago FROM compra WHERE id_usuario = ${req.params.id_usuario}`);
    const codigoMP = codigo[0][0].id_mercadopago;
    
    const compraPendiente = (await mercadopago.preferences.findById(codigoMP));
    if (!compraPendiente.body.expires) {
        datos = {
                fechaExpiracion: compraPendiente.body.expiration_date_to,
                fechaInicio: compraPendiente.body.expiration_date_from,
                url: compraPendiente.body.init_point,
                expiro: compraPendiente.body.expires,
                items: compraPendiente.body.items

            }

    res.json(datos);
}
}

compraCtrl.createCompra = async(req, res) => {
    email = req.body[0].email;
    

    await sequelize.query(`SELECT * FROM cliente WHERE email = '${email}'`).then( async user =>{
        
        let compraNueva = new Compra();
        compraNueva.id_usuario = user[0][0].id_usuario;
        compraNueva.estado = 'Pendiente de pago';
        compraNueva.total = req.body[0].precio;
                           
        var now = new Date();
        const fromFecha = (now.toISOString().replace('Z', '')+'-00:00');
        console.log(fromFecha);
        const fechaMas1 = now.getDate() + 1;
        now.setDate(fechaMas1);
        const toFecha = (now.toISOString().replace('Z', '')+ '-00:00');
        
        var total = 0;
        let items = [];
        
        req.body.forEach( plato => {
            item = {
            title: plato.linea + ' ' + plato.modelo,
            unit_price: plato.precio,
            quantity: plato.cantidad
            }
            total += plato.precio;
            items.push(item);
        });

        let preference = {
            expiration_date_from: fromFecha,                                                                                                                                                                                                                                                                          
            expiration_date_to: toFecha,
            items
        };

        const fechaHoy = now.getDate()+'-'+ now.getMonth()+'-'+now.getFullYear();
        const horaHoy = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        
        const id_carroObtenida = await sequelize.query(`SELECT DISTINCT id_carro FROM carro where id_usuario = ${compraNueva.id_usuario} and activo = true`);
        console.log(id_carroObtenida[0][0].id_carro);
        

        mercadopago.preferences.create(preference).then((response) => {
            sequelize.query(`INSERT INTO compra VALUES(DEFAULT, ${id_carroObtenida[0][0].id_carro}, ${user[0][0].id_usuario}, '${response.body.id}', 'Pendiente de pago', '${fechaHoy}', '${horaHoy}', ${total})`)
                .then( (result) => {
                    res.send({url: response.body.init_point}); 
            }).catch((error) => {
                console.log('Error catch sequ: ' + error);
            });       

    }).catch( err => { console.log('Eror 1: ' + err);})
    });  
}   




compraCtrl.getCompras = async(req, res) => {
    const compras = await Compra.findAll();
    res.json(compras);
}

module.exports = compraCtrl;