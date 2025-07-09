const Suscripcion = require('../models/Suscripcion');

class SuscripcionController {
  static async crearSuscripcion(req, res) {
    try {
      const { id_usuario, id_curso } = req.body;

      console.log('REQ.BODY:', req.body); // ← Esto imprime lo que llega exactamente

      // Validación
      if (!id_usuario || !id_curso || id_usuario <= 0 || id_curso <= 0) {
        return res.status(400).json({ error: 'ID de usuario o curso inválido' });
      }
      console.log("Suscribiendo con:", id_usuario, id_curso);

      const nueva = await Suscripcion.crear({ id_usuario, id_curso });
      res.status(201).json(nueva);
    } catch (error) {
      console.error('Error al crear suscripción:', error);
      res.status(500).json({ error: error.message, detail: error.detail });
    }
  }

  static async cancelarSuscripcion(req, res) {
    try {
      const cancelada = await Suscripcion.cancelar(req.body);
      res.json(cancelada);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async consultarSuscripcion(req, res) {
    try {
      const { id_usuario, id_curso } = req.query;

      console.log("Query recibida:", id_usuario, id_curso);

      if (!id_usuario || !id_curso) {
        return res.status(400).json({ error: 'Faltan parámetros: id_usuario o id_curso' });
      }

      const resultado = await Suscripcion.consultar({
        id_usuario: parseInt(id_usuario),
        id_curso: parseInt(id_curso),
      });

      res.json(resultado);
    } catch (error) {
      console.error("Error consultando suscripción:", error.message);
      res.status(404).json({ error: error.message });
    }
  }

}

module.exports = SuscripcionController;
