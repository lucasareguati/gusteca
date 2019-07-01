const Carro = require('../models/carro');
const { Sequelize, sequelize } = require('../database');

const carroCtrl = {};

carroCtrl.getCarros = async(req, res) => {
    const carros = await sequelize.query(`SELECT carro.id_carrito, carro.comprado FROM carro, cliente cli WHERE carro.id_usuario = cli.id_usuario and cli.email = '${req.params.email}'`);
    res.json(carros[0]);
}

carroCtrl.createCarro = async(req, res) => {
    const carroCreado = req.body;
    await Carro.create(carroCreado);
    res.send({status: 'Carro crado correctamente'});
}
 
module.exports = carroCtrl;