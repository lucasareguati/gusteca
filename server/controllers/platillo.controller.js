const Platillo = require('../models/platillo');
const { sequelize, Sequelize } = require('../database');


const platilloCtrl = {};

platilloCtrl.getPlatillos = async (req, res) => {
    const platillos = await Platillo.findAll();
    res.json(platillos);
}

platilloCtrl.createPlatillo = async(req, res) => {
    const platilloCreado = req.body;
    platilloCreado.baja = false;
    await Platillo.create(platilloCreado);
    res.send({
        status: "Guardado correctamente"
    })
    }



platilloCtrl.getPlatillo = async (req, res) => {
   const platillo = await Platillo.findById(req.params.id);
   res.json(platillo);
}

platilloCtrl.editPlatillo = async(req, res) => {
    const id = req.params.id;
    console.log(id);
    
    const platilloActualizado = {
        id_platillo: id,
        linea: req.body.linea,
        modelo: req.body.modelo,
        aleacion: req.body.aleacion,
        diametro: req.body.diametro,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        marca: req.body.marca,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        baja: req.body.baja    
        }
    
    await Platillo.update(platilloActualizado,{
        where: {
            id_platillo: id
        }});
    res.json(platilloActualizado);
    
}

platilloCtrl.deletePlatillo = async(req, res) => {
    await Platillo.destroy({
        where: {
            id_platillo: req.params.id
        },
        truncate: false
    });
    res.json({
        status: `Platillo ${req.params.id} eliminado correctamente`
    })

}

module.exports = platilloCtrl;