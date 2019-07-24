const express = require('express');
const router = express.Router();
const compra = require('../controllers/compra.controller');

//router.get('/', compra.getCompras);
router.post('/', compra.createCompra);
router.get('/:id_usuario', compra.getCodigo);
router.post('/ipn', compra.ipn);

module.exports = router;