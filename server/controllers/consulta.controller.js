const Consulta = require('../models/consulta');
const { sequelize, Sequelize } = require('../database');
var nodemailer = require('nodemailer');

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

consultaCtrl.getConsultasSinRespuesta = async (req, res ) => {
    
    const consulta = await sequelize.query(`SELECT * FROM consulta INNER JOIN usuarioConsulta ON consulta.id_platillo = usuarioConsulta.id_platillo WHERE consulta.id_consulta = usuarioConsulta.id_consulta and consulta.respuesta = '' `);
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
        }}).then(async (req, res) => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'gustecadrumps@gmail.com',
                    pass: 'gusteca2019'
                }
            });
            const Receptor = await sequelize.query(`SELECT email, nombre FROM cliente WHERE id_usuario = ${consultaActualizada.id_usuario}`);
            
            var mailOptions = {
                from: 'GustecaDrumps <gustecadrumps@gmail.com>',
                to: Receptor[0][0].email,
                subject: 'Counsulta a GustecaDrumps.',
                text: 'Hola ',
                html: `<h1>Hola ${Receptor[0][0].nombre}</h1>
                <h3>Hemos respondido tu consulta: <b>${consultaActualizada.consulta}</b></h3>
                <h4>${consultaActualizada.respuesta}</h4>
                <p>Esperamos haberte ayudado. Atte GustecaDrumps.</p>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error); 
                } else {
                    console.log('Mensaje enviado ' + info.response)
                }
            }); 
        });
    
    res.json(consultaActualizada);
    }



module.exports = consultaCtrl;