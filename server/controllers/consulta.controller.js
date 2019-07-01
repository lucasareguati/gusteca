const Consulta = require('../models/consulta');
const { sequelize, Sequelize } = require('../database');

const consultaCtrl = {};

consultaCtrl.getConsultas = async (req, res) => {
    /*const consultas = await Consulta.findAll(
        {where:{
            id_platillo: req.params.idPlatillo
    }});
    res.json(consultas);*/

    const consulta = await sequelize.query(`SELECT * FROM consulta INNER JOIN usuarioConsulta ON consulta.id_platillo = usuarioConsulta.id_platillo WHERE consulta.id_consulta = usuarioConsulta.id_consulta and usuarioConsulta.id_platillo = ${req.params.idPlatillo}`)
    res.json(consulta);
}   

consultaCtrl.createConsulta = async (req, res) => {
    const consultaCreada = req.body;
    await Consulta.create(consultaCreada);
    res.send({status: "Consulta creada correctamente"});
}

consultaCtrl.editConsulta = async (req, res) => {
    const id = req.params.idConsulta;
    const consultaActualizada = {
        id_consulta: id,
        id_usuario: req.body.id_usuario,
        id_platillo: req.body.id_platillo,
        consulta: req.body.consulta,
        fecha: req.body.fecha,
        respuesta: req.body.respuesta
    }
    await Consulta.update(consultaActualizada, {
        where: {
            id_consulta: id
        }});

    res.json(consultaActualizada);
    }



module.exports = consultaCtrl;