const express = require('express');
const router = express.Router();
const datosController = require('../controllers/datoscontroller');
const { authenticateApiKey } = require('../middleware/auth');

// Aplicar autenticación a todas las rutas
router.use(authenticateApiKey);

// Definir endpoints
router.get('/', datosController.getAllDatos);
router.get('/search', datosController.searchDatos);
router.get('/:id', datosController.getDatoById);

module.exports = router;