const pool = require('../config/db');

class Suscripcion {
  constructor(id_usuario, id_curso, fecha_suscripcion) {
    this.id_usuario = id_usuario;
    this.id_curso = id_curso;
    this.fecha_suscripcion = fecha_suscripcion;
  }

  static async crear({ id_usuario, id_curso }) {
    const result = await pool.query(
      'INSERT INTO suscripciones (id_usuario, id_curso) VALUES ($1, $2) RETURNING *',
      [parseInt(id_usuario), parseInt(id_curso)]
    );
    const s = result.rows[0];
    return new Suscripcion(s.id_usuario, s.id_curso, s.fecha_suscripcion);
  }

  static async cancelar({ id_usuario, id_curso }) {
    const result = await pool.query(
      'DELETE FROM suscripciones WHERE id_usuario = $1 AND id_curso = $2 RETURNING *',
      [id_usuario, id_curso]
    );
    if (result.rows.length > 0) {
      const s = result.rows[0];
      return new Suscripcion(s.id_usuario, s.id_curso, s.fecha_suscripcion);
    } else {
      throw new Error('Suscripción no encontrada');
    }
  }

  static async consultar({ id_usuario, id_curso }) {
    const result = await pool.query(
      'SELECT * FROM suscripciones WHERE id_usuario = $1 AND id_curso = $2',
      [id_usuario, id_curso]
    );

    if (result.rows.length > 0) {
      const s = result.rows[0];
      return new Suscripcion(s.id_usuario, s.id_curso, s.fecha_suscripcion);
    } else {
      throw new Error('No hay suscripción activa');
    }
  }

}

module.exports = Suscripcion;
