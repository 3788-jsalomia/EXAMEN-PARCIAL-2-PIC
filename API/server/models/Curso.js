const pool = require('../config/db');

class Curso {
  constructor(id, nombre, descripcion, estado, id_creador) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.id_creador = id_creador;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM cursos ORDER BY nombre');
    return result.rows.map(row => new Curso(
      row.id, row.nombre, row.descripcion, row.estado, row.id_creador
    ));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const c = result.rows[0];
      return new Curso(c.id, c.nombre, c.descripcion, c.estado, c.id_creador);
    } else {
      throw new Error('Curso no encontrado');
    }
  }

  static async create(curso) {
    const result = await pool.query(
      'INSERT INTO cursos (nombre, descripcion, estado, id_creador) VALUES ($1, $2, $3, $4) RETURNING *',
      [curso.nombre, curso.descripcion, curso.estado, curso.id_creador]
    );
    const c = result.rows[0];
    return new Curso(c.id, c.nombre, c.descripcion, c.estado, c.id_creador);
  }

  static async cambiarEstado(id, nuevoEstado) {
    const result = await pool.query(
      'UPDATE cursos SET estado = $1 WHERE id = $2 RETURNING *',
      [nuevoEstado, id]
    );
    if (result.rows.length > 0) {
      const c = result.rows[0];
      return new Curso(c.id, c.nombre, c.descripcion, c.estado, c.id_creador);
    } else {
      throw new Error('Curso no encontrado');
    }
  }
}

module.exports = Curso;
