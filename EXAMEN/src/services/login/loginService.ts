import type { Usuario } from '../../interfaces/usuarios/Usuario';

const API_URL = "http://localhost:3000/api/usuarios";

export const loginUsuario = async (email: string, contrasena: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, contraseña: contrasena })
  });

  if (!response.ok) throw new Error("Credenciales incorrectas");

  const data= await response.json(); // debe retornar el usuario logueado
  return data.usuario;

};