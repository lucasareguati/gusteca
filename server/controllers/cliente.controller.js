const Cliente = require('../models/cliente');
const { sequelize, Sequelize} = require('../database');

const clienteCtrl = {};

clienteCtrl.getUsuarios = async (req, res) => {
    
    const clientes = await Cliente.findAll();
    res.json(clientes);
}
 
clienteCtrl.getNombreUsuarios = async (req, res) => {
    const nombres = await sequelize.query(`SELECT nombre_usuario from cliente`);
    res.json(nombres);
}

clienteCtrl.getUsuario = async (req, res) => {
    
    // Obtiene los datos del user a partir del email.
    const usuario = await Cliente.findAll({
        where: {
            email: req.params.email
        }
    });

    res.json(usuario);
}

clienteCtrl.createUsuario = async(req, res) => {
    var id_user = null;
    await Cliente.create(req.body).then(resp => {
        console.log(resp.dataValues.id_usuario);
        id_user = resp.dataValues.id_usuario;
    }).catch(err => {
        console.log('Error: ' + err);
    });
    res.json({status: 'Creado Correctamente', id_usuario: id_user});
}

clienteCtrl.editUsuario = async(req, res) => {
    const id = req.params.id;

    const usuarioActualizado = {
        nombre_usuario: req.body.nombre_usuario,
        nombre: req.body.nombre,
        codigopostal: req.body.codigopostal,
        email: req.body.email,
        activo: req.body.activo,
        tel: req.body.tel
    }

    await Cliente.update(usuarioActualizado, {
        where: {
            id_usuario: id
        }
    }).then(res => {
        res.json(res);
    }).catch(err => {
        res.json(err);  
    })
    //res.json(usuarioActualizado);
}

module.exports = clienteCtrl;