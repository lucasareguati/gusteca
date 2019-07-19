const express = require('express');
const router = express.Router();
const carrito = require('../controllers/carrito.controller');


router.get('/:email', carrito.getCarritos);
router.post('/', carrito.createCarrito);
router.delete('/:id_carrito', carrito.deleteCarrito);
router.put('/:id_carrito', carrito.editCarrito);

module.exports = router;