const Curso = require('../models/Curso');
const Usuario = require('../models/Usuario');

class CursoController {
  static async getAllCursos(req, res) {
    try {
      const cursos = await Curso.getAll();
      res.json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCursoById(req, res) {
    try {
      const curso = await Curso.getById(req.params.id);
      res.json(curso);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
static async createCurso(req, res) {
  try {
    const curso = req.body;

    // Validar creador
    const creador = await Usuario.getById(curso.id_creador);
    if (!creador || creador.tipo_usuario !== 'creador') {
      return res.status(400).json({ error: 'El ID de creador no es válido' });
    }

    const nuevo = await Curso.create(curso);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  static async cambiarEstadoCurso(req, res) {
    try {
      const actualizado = await Curso.cambiarEstado(req.params.id, req.body.estado);
      res.json(actualizado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async deleteCurso(req, res) {
    try {
      const curso = await Curso.getById(req.params.id);
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
      }
      // Aquí podrías agregar lógica para eliminar el curso de la base de datos
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CursoController;
