const Compra = require('../models/compra');
const Carro = require('../models/carro');
const { sequelize, Sequelize } = require('../database');
var mercadopago = require('mercadopago');

const compraCtrl = {};

compraCtrl.ipn = async (req, res) => {
    
    if (req.body.action === 'payment.created') {
        const id_pago = req.body.data['id'];
        
        await mercadopago.payment.findById(id_pago).then( async pago => {
            if (pago.body['status'] === 'approved'){
                const order_id =  pago.body['order']['id'];
                await Compra.update({estado: 'Pagado'},
                {where: {
                    id_order: order_id
                }}).then(() => {
                    console.log('Pago actualizado con exito');
                }).catch(error => console.log(error));
            }
        }).catch(err => console.log (err));
        
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
    
    const codigo = await sequelize.query(`SELECT id_order FROM compra WHERE id_usuario = ${req.params.id_usuario}`);
    lista = [];
    listaPreferences = [];
    codigo[0].forEach(code => {
        lista.push(code.id_order);
    });

    for (let i = 0; i < lista.length; i++) {
        await mercadopago.merchant_orders.findById(lista[i]).then( async order =>{
            console.log(order);
            // si no expiro
            if (!order.body['cancelled']){
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
      
    } );
    }
    
    listaCompras = [];
    obj = {};
    const compras = await Compra.findAll({where: {
        id_usuario: req.params.id_usuario,
        estado: 'Pagado'
    }});
    if (compras[0] != undefined){
        //for 
        listaFacturas = [];
        listaCompras.push(compras[0].dataValues);
        console.log(listaCompras);
        await sequelize.query(`SELECT * FROM factura WHERE id_compra = ${listaCompras[0].id_compra}`).then(platillos =>{
        
            factura = {
                id_order: listaCompras[0].id_order,
                fecha: listaCompras[0].fechacompra,
                hora: listaCompras[0].horacompra,
                total: listaCompras[0].total,
                platillos: platillos[0]
            }

            //listaCompras[0] += (platillos[0]);
            console.log(factura);
            listaFacturas.push(factura);
        });
        //endfor
        obj = { listaFacturas, listaPreferences }
    }

    res.json(obj); 
}



function insert_Compra(id_Carro, user, response, horaHoy, total) {
    if(id_Carro === -1) {
        return (`INSERT INTO compra VALUES(DEFAULT, DEFAULT, ${user[0][0].id_usuario}, '${response.body.id}', 'Pendiente de pago', DEFAULT, '${horaHoy}', ${total})`);
    } else {
        return (`INSERT INTO compra VALUES(DEFAULT, ${id_Carro}, ${user[0][0].id_usuario}, '${response.body.id}', 'Pendiente de pago', DEFAULT, '${horaHoy}', ${total})`);
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
            expires: true,
            expiration_date_from: fromFecha,                                                                                                                                                                                                                                                                          
            expiration_date_to: toFecha,
            items,
            notification_url: 'https://gusteca.herokuapp.com/compra/ipn'            
        };
        var hoy = new Date();
        const fechaHoy = hoy.getDate()+'-'+ hoy.getMonth()+'-'+hoy.getFullYear();
        const horaHoy = hoy.getHours()+':'+ hoy.getMinutes()+':'+hoy.getSeconds();
        
        await sequelize.query(`SELECT DISTINCT id_carro FROM carro where id_usuario = ${compraNueva.id_usuario} and activo = true`).then( (res)=> {
            console.log(res)
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
                        console.log(order.items);

                        sequelize.query(insert_Compra(id_Carro,user, order, horaHoy, total))
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
    



/*
compraCtrl.getCompras = async(req, res) => {
    const compras = await Compra.findAll();
    res.json(compras);
}*/

module.exports = compraCtrl;