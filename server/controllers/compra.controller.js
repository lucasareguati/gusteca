const Compra = require('../models/compra');
const Carro = require('../models/carro');
var moment = require('moment');
const { sequelize, Sequelize } = require('../database');
var mercadopago = require('mercadopago');

const compraCtrl = {};

compraCtrl.ipn = async (req, res) => {
    
    if (req.body.action === 'payment.created') {
        const id_pago = req.body.data['id'];
        
        mercadopago.payment.get(id_pago).then( pay => {
            mercadopago.merchant_orders.get(pay.body.order.id).then(res => {
                mercadopago.preferences.get(res.body.preference_id).then( pref => {
                    Compra.update({estado: 'Pagado'}, {where: {
                        id_preference: pref.body.id
                    }}).then( ()=> {
                        console.log('Pago actualizado correctamente');
                    })
                            
                });
            });
    });         

    }  
    res.send({ok: 'si'}, 200);
}

function getId_carro(id_carro) {
    if (id_carro === 'DEFAULT') {
        return ;
    } else {
        return id_carro;
    }
}

function bajaCarrito(id_carro) {
    carritos = [];
    sequelize.query(`SELECT id_carrito FROM carro where id_carro = ${id_carro}`).then(async id_carrito => {
        carritos = id_carrito[0];
        console.log(carritos);
        for (let i = 0; i < carritos.length; i++) {
            const carr = carritos[i];
            await sequelize.query(`UPDATE carrito SET activo = false WHERE id_carrito = ${carr['id_carrito']}`).then(()=> {
                console.log('Actualizado correctamente');
            })
            
        }
    });
}


compraCtrl.getCodigo = async (req, res) => {
    
    const codigo = await sequelize.query(`SELECT id_order FROM compra WHERE id_usuario = ${req.params.id_usuario} and estado <> 'Pagado' `);
    lista = [];
    listaPreferences = [];
    codigo[0].forEach(code => {
        lista.push(code.id_order);
    });
    
    for (let i = 0; i < lista.length; i++) {
        await mercadopago.merchant_orders.findById(lista[i]).then( async order =>{
            // si no expiro o no se pago aún
            console.log(order.body['status']);
            if (!order.body['cancelled'] || order.body['status'] === 'opened') {
    
                const preference_id = order.body['preference_id'];
                
                var elem = await mercadopago.preferences.findById(preference_id);
                datos = {
                    fechaExpiracion: elem.body.expiration_date_to,
                    fechaInicio: elem.body.expiration_date_from,
                    url: elem.body.init_point,
                    items: elem.body.items
                }
                listaPreferences.push(datos);
            }
      
        });
    }
    
    listaCompras = [];
    obj = {};
    const compras = await sequelize.query(`SELECT * FROM compra WHERE id_usuario = ${req.params.id_usuario} and estado = 'Pagado'`); //agregar = pagado
    
    if (compras[0] != undefined){
        listaFacturas = [];
        compras[0].forEach(compra => {
            listaCompras.push(compra);
        });
        console.log(listaCompras);
        for (let i = 0; i < listaCompras.length; i++) {
            await sequelize.query(`SELECT * FROM factura WHERE id_compra = ${listaCompras[i].id_compra}`).then(platillos =>{
                console.log('PLATILLOS');
                console.log(platillos);
                factura = {
                    id_order: listaCompras[i].id_order,
                    fecha: listaCompras[i].fechacompra,
                    hora: listaCompras[i].horacompra,
                    total: listaCompras[i].total,
                    platillos: platillos[0]
                }

                //listaCompras[0] += (platillos[0]);
                console.log(factura);
                listaFacturas.push(factura);
            
            });
        }
        
        obj = {listaFacturas, listaPreferences}
    } else {
        obj = {listaPreferences}
    }
    
    res.json(obj); 
}



function insert_Compra(id_Carro, user, preference, order,fechaHoy, horaHoy, total) {
    if(id_Carro === -1) {
        return (`INSERT INTO compra VALUES(DEFAULT, DEFAULT, ${user[0][0].id_usuario}, '${preference}', '${order.body.id}', 'Pendiente de pago', '${fechaHoy}', '${horaHoy}', ${total})`);
    } else {
        return (`INSERT INTO compra VALUES(DEFAULT, ${id_Carro}, ${user[0][0].id_usuario}, '${preference}', '${order.body.id}', 'Pendiente de pago', '${fechaHoy}', '${horaHoy}', ${total})`);
    };
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
            total += plato.precio * plato.cantidad;
            items.push(item);
        });

        let preference = {
            expires: true,
            expiration_date_from: fromFecha,                                                                                                                                                                                                                                                                          
            expiration_date_to: toFecha,
            items,
            notification_url: 'https://gusteca.herokuapp.com/compra/ipn'            
        };
        
        const fechaHoy = moment().format('YYYY/MM/DD');
        const horaHoy = moment().format('HH:mm:ss');
        await sequelize.query(`SELECT DISTINCT id_carro FROM carro where id_usuario = ${compraNueva.id_usuario} and activo = true`).then( (res)=> {
            if (res[0].length == 0) {
                console.log('no hay carro');
                id_Carro = -1;
                
            }else{
                id_Carro = (res[0][0].id_carro);
            }
        }).catch(err => console.log(err));
       
        // creo la preferencia
        await mercadopago.preferences.create(preference).then((response) => {
            
            obj = {
                preference_id: response.body.id
            }
            //creo la orden y guardo el id en la tabla
                mercadopago.merchant_orders.create(obj).then(order => {
                        console.log('ORDER ID CREADA: ' + order.body.id);
                        console.log(obj['preference_id']);
                        sequelize.query(insert_Compra(id_Carro, user, obj['preference_id'], order,fechaHoy, horaHoy, total))
                            .then( async (result) => {
                                a = [];
                                // desactivo el carro
                                const carroAInactivo = await Carro.findAll({
                                    where: {
                                        id_carro: id_Carro,
                                        activo: true,
                                    }
                                });
                                bajaCarrito(id_Carro);
                                carroAInactivo.forEach(carro => {
                                    a.push(carro.dataValues);
                                });
                                
                                a.forEach(async carro => {
                                    await Carro.update({activo: false},{where: 
                                    {
                                        id_carro: carro.id_carro,
                                        id_carrito: carro.id_carrito
                                    }});
                                });

                    }).catch(err => {console.log(err)});

                 console.log(response.body);
                    res.send({url: response.body.init_point}); 
            }).catch((error) => {
                console.log('Error catch sequ: ' + error);
            }); 
        });

    }).catch( err => { console.log('Eror 1: ' + err);}) 
}  

compraCtrl.getCompras = async(req, res) => {
    listaCompras = [];
    obj = {};
    const compras = await Compra.findAll({where: {estado: 'Pagado'}});
    for (let i = 0; i < compras.length; i++) {
        const compra = compras[i];
        listaCompras.push(compra.dataValues);
        console.log(listaCompras);
    }

        listaFacturas = [];
        for (let i = 0; i < listaCompras.length; i++) {
            const compra = listaCompras[i];
            
            await sequelize.query(`SELECT * FROM factura WHERE id_compra = ${compra.id_compra}`).then(async platillos =>{
                    await sequelize.query(`SELECT nombre FROM cliente WHERE id_usuario = ${compra.id_usuario}`).then( usuario => {
                        
                        factura = {
                            id_order: listaCompras[i].id_order,
                            nombre: usuario[0][0].nombre,
                            fecha: listaCompras[i].fechacompra,
                            hora: listaCompras[i].horacompra,
                            total: listaCompras[i].total,
                            platillos: platillos[0]
                        }
                    });
                listaFacturas.push(factura);
            });
        }

        res.json(listaFacturas);
    }

module.exports = compraCtrl;