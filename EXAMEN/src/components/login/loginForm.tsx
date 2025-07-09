import React, { useState } from "react";
import { loginUsuario } from "../../services/login/loginService";
import type { Usuario } from "../../interfaces/usuarios/Usuario";
import "../../estilos/login/login.css"; // Asegúrate de tener un archivo CSS para estilos

interface Props {
  onLogin: (usuario: Usuario) => void; // pasa el usuario logueado al padre
}

export const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuario = await loginUsuario(correo, contrasena);
      onLogin(usuario);
    } catch (err) {
      setError("Correo o contraseña inválidos PRUEBA");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        required
      />

      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Contraseña"
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Ingresar</button>
    </form>
  );
};
