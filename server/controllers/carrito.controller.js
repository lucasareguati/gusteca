const Carrito = require('../models/carrito');
const { sequelize, Sequelize } = require('../database');


const carritoCtrl = {};


carritoCtrl.getCarritos = async(req, res) => {
    const carritos = await sequelize.query(`SELECT * FROM carritoCarro WHERE email = '${req.params.email}'`);
                                                
    res.json(carritos[0]);
}

carritoCtrl.createCarrito = async(req, res) => {
    await Carrito.create(req.body).then(result => {
        res.send({id_carrito: result.dataValues.id_carrito});
    });
    
}



carritoCtrl.editCarrito = async(req, res) => {
    const id = req.params.idCarrito;

    const carritoActualizado = {
        cantidad: req.body.cantidad
    }
    await Carrito.update(carritoActualizado, {
        where: {
            id_carrito: id
        }
    });
    res.json(carritoActualizado);
}


module.exports = carritoCtrl;