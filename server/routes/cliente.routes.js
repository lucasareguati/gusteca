const express = require('express');
const router = express.Router();
const cliente = require('../controllers/cliente.controller');

router.get('/', cliente.getUsuarios);
router.post('/', cliente.createUsuario);
router.get('/:email', cliente.getUsuario);
router.put('/:id', cliente.editUsuario);

module.exports = router;