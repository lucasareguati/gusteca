const express = require('express');
const router = express.Router();
const consulta = require('../controllers/consulta.controller');

router.get('/:idPlatillo', consulta.getConsultas);
router.post('/', consulta.createConsulta);
router.put('/:idConsulta', consulta.editConsulta);


module.exports = router;