const Carro = require('../models/carro');
const { Sequelize, sequelize } = require('../database');
const mercadopago = require('mercadopago');

const carroCtrl = {};

carroCtrl.getCarros = async(req, res) => {
    const carros = await sequelize.query(`SELECT carro.id_carrito, carro.comprado FROM carro, cliente cli WHERE carro.activo = true and carro.id_usuario = cli.id_usuario and cli.email = '${req.params.email}'`);
    console.log('carro: ' + carros[0]);
    res.json(carros[0]);
    
}

carroCtrl.createCarro = async(req, res) => {
    
    const esnuevo = await Carro.findAndCount({
        where:{ // Devuelve si hay registros, count = 0 si no hay;
            id_usuario: req.body.id_usuario,
            activo: true
    }});
    console.log(esnuevo);
    
    if (esnuevo.count == 0) { 
        console.log('CARRO NUEVO');
        const carroCreado = req.body;
        await Carro.create(carroCreado);
        res.send({status: 'Carro creado correctamente'});
    } else {
        console.log('CARRO EN USO');
        const id_carro = (esnuevo.rows[0].dataValues.id_carro);
        carroCreado = req.body;
        carroCreado.id_carro = id_carro;
        await Carro.create(carroCreado);
        res.send({status: 'Elemento agregado al carro'});
      }
    
    console.log(req.body);
    
}
 
module.exports = carroCtrl;