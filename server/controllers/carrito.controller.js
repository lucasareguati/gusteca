const Carrito = require('../models/carrito');
const { sequelize, Sequelize } = require('../database');


const carritoCtrl = {};


carritoCtrl.getCarritos = async(req, res) => {
    const carritos = await sequelize.query(`SELECT * FROM carritoCarro WHERE email = '${req.params.email}' and activo = true`);
    console.log(carritos[0]);
    res.json(carritos[0]);
}

carritoCtrl.createCarrito = async(req, res) => {
    await Carrito.create(req.body).then(result => {
        res.send({id_carrito: result.dataValues.id_carrito});
    });
    
}



carritoCtrl.deleteCarrito = async(req, res) => {
    const id = req.params.id_carrito;

    await sequelize.query(`DELETE FROM Carrito where id_carrito = ${id}`).then(
        res.json({status: 'Eliminado correctamente'})
    );

}

carritoCtrl.editCarrito = async(req, res) => {
    const id = req.params.idCarrito;
    console.log(req.body);
    
    
    const carritoActualizado = {
        cantidad: req.body.cantidad
    }
    await Carrito.update(carritoActualizado, {
        where: {
            id_carrito: id
        }
    });
}


module.exports = carritoCtrl;