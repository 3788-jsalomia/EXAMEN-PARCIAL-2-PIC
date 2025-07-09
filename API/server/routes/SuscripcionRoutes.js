const express = require('express');
const router = express.Router();
const SuscripcionController = require('../controllers/SuscripcionController');

router.post('/suscripciones', SuscripcionController.crearSuscripcion);
router.delete('/suscripciones/:id', SuscripcionController.cancelarSuscripcion);
router.get('/suscripciones/:id', SuscripcionController.consultarSuscripcion);

module.exports = router;
