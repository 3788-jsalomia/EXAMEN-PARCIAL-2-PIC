const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');
const Curso = require('../models/Curso');


router.post('/cursos', CursoController.createCurso);
router.get('/cursos', CursoController.getAllCursos);
router.put('/cursos/:id', CursoController.cambiarEstadoCurso);
router.get('/cursos/:id', CursoController.getCursoById);
router.delete('/cursos/:id', CursoController.deleteCurso);

module.exports = router;
