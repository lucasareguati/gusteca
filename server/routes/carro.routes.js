const express = require('express');
const router = express.Router();
const carro = require('../controllers/carro.controller');

router.get('/:email', carro.getCarros);
router.post('/', carro.createCarro);
// router.delete('/id', carro.deleteCarro);

module.exports = router; 
