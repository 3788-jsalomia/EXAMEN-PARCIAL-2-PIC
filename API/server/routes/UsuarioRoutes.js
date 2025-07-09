const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');




router.post('/usuarios', UsuarioController.createUsuario);

router.post('/usuarios/login', UsuarioController.loginUsuario);

router.get('/usuarios', UsuarioController.getAllUsuarios);
router.get('/usuarios/:id', UsuarioController.getUsuarioById);

router.delete('/usuarios/:id', UsuarioController.deleteUsuario);




module.exports = router;
