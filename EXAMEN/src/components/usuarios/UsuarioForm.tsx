import type React from "react";
import type { Usuario } from "../../interfaces/usuarios/Usuario"; // Import the interface
import { useState } from "react";
import "../../estilos/usuarios/usuarioForm.css"; // Import the CSS styles for the component

interface Props {
    // Define the props for the AutorForm component
    initialData?: Partial<Usuario>; // Initial data for the form, can be empty or pre-filled

    onSubmit: (autor: Omit<Usuario, 'id'>) => void; // Function to handle form submission
}

export const UserForm: React.FC<Props> = ({ initialData = {}, onSubmit }) => {

    const [form, setForm] = useState<Omit<Usuario, 'id'>>({
        nombres: initialData.nombres || '',
        apellidos: initialData.apellidos || '',
        email: initialData.email || '',
        contraseña: initialData.contraseña || '',
        tipo_usuario: initialData.tipo_usuario || '',

    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // No se recarga la página al enviar el formulario
        onSubmit(form); // Call the onSubmit function passed as a prop with the form data
        setForm({ // Reset the form to initial state after submission
            nombres: '',
            apellidos: '',
            email: '',
            contraseña: '',
            tipo_usuario: '',
        });
    }

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <input type="text"
                name="nombres"
                value={form.nombres}
                onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                required
                placeholder="nombres"
            />
            <input type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                required
                placeholder="apellidos"
            />
            <input type="text"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="email"
            />
            <input type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
                required
                placeholder="contraseña"
            />
            <select
                name="tipo_usuario"
                value={form.tipo_usuario}
                onChange={(e) => setForm({ ...form, tipo_usuario: e.target.value })}
                required
            >
                <option value="">Selecciona un tipo de usuario</option>
                <option value="administrador">
                    Administrador
                </option>
                <option value="creador">
                    Creador
                </option>
                <option value="consumidor">
                    Consumidor
                </option>
            </select>


            <button type="submit">Guardar</button>
        </form>
    );
};