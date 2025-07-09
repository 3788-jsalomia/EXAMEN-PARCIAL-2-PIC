const pool = require('../config/db');

class Usuario {
  constructor(id, nombres, apellidos, email, contraseña, tipo_usuario) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.contraseña = contraseña;
    this.tipo_usuario = tipo_usuario;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY apellidos');
    return result.rows.map(row => new Usuario(
      row.id, row.nombres, row.apellidos, row.email, row.contraseña, row.tipo_usuario
    ));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const u = result.rows[0];
      return new Usuario(u.id, u.nombres, u.apellidos, u.email, u.contraseña, u.tipo_usuario);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  static async create(usuario) {
    const result = await pool.query(
      'INSERT INTO usuarios (nombres, apellidos, email, contraseña, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [usuario.nombres, usuario.apellidos, usuario.email, usuario.contraseña, usuario.tipo_usuario]
    );
    const u = result.rows[0];
    return new Usuario(u.id, u.nombres, u.apellidos, u.email, u.contraseña, u.tipo_usuario);
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      const u = result.rows[0];
      return new Usuario(u.id, u.nombres, u.apellidos, u.email, u.contraseña, u.tipo_usuario);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  static async getByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const u = result.rows[0];
    if (!u) return null;

    return new Usuario(u.id, u.nombres, u.apellidos, u.email, u.contraseña, u.tipo_usuario);
  }

}

module.exports = Usuario;
