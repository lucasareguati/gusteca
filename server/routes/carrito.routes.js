const express = require('express');
const router = express.Router();
const carrito = require('../controllers/carrito.controller');


router.get('/:email', carrito.getCarritos);
router.post('/', carrito.createCarrito);
router.put('/:idCarrito', carrito.editCarrito);

module.exports = router;