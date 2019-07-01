const express = require('express');
const router = express.Router();
const platillo = require('../controllers/platillo.controller');

router.get('/', platillo.getPlatillos);
router.post('/', platillo.createPlatillo);
router.get('/:id', platillo.getPlatillo);
router.put('/:id', platillo.editPlatillo);
router.delete('/:id', platillo.deletePlatillo);

module.exports = router;