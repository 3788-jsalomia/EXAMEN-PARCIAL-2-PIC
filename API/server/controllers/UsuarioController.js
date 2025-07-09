const Usuario = require('../models/Usuario');

class UsuarioController {
  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUsuarioById(req, res) {
    try {
      const usuario = await Usuario.getById(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createUsuario(req, res) {
    try {
      const nuevo = await Usuario.create(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const eliminado = await Usuario.delete(req.params.id);
      res.json(eliminado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }




  static async loginUsuario(req, res) {
    try {
      console.log("body", req.body);
      const { email, contraseña } = req.body;

      // Validación básica
      if (!email || !contraseña) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }

      const usuario = await Usuario.getByEmail(email);

      if (!usuario || usuario.contraseña !== contraseña) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }


      res.status(200).json({
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          id: usuario.id,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario
        }
        
      });      

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = UsuarioController;
