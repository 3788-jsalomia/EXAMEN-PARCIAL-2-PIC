import type React from "react";
import type { Curso } from "../../interfaces/cursos/Curso"; // Import the interface
import type { Usuario } from "../../interfaces/usuarios/Usuario";
import { useEffect, useState } from "react";
import "../../estilos/usuarios/usuarioForm.css"; // Import the CSS styles for the component

interface Props {
    // Define the props for the AutorForm component
    initialData?: Partial<Curso>; // Initial data for the form, can be empty or pre-filled

    onSubmit: (autor: Omit<Curso, 'id'>) => void; // Function to handle form submission
    creadores: Usuario[]; // Optional list of creators, if needed
}

export const CursoForm: React.FC<Props> = ({ initialData = {}, onSubmit, creadores }) => {

    const [form, setForm] = useState<Omit<Curso, 'id'>>({
        nombre: '',
        descripcion: '',
        estado: '',
        id_creador: 0, // Assuming id_creador is a number

    });

    const creadoresFiltrados = creadores.filter(c => c.tipo_usuario === "creador");

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                estado: initialData.estado || '',
                id_creador: initialData.id_creador || 0,
            });
        }
    }, [initialData]); // ✅ correcto: paréntesis y corchetes en orden

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // No se recarga la página al enviar el formulario
        onSubmit(form); // Call the onSubmit function passed as a prop with the form data
        setForm({ // Reset the form to initial state after submission
            nombre: '',
            descripcion: '',
            estado: '',
            id_creador: + 0, // Assuming id_creador is a number
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, estado: e.target.value });
    };

    const esEdicion = !!initialData.id;


    return (
        <form onSubmit={handleSubmit} className="user-form">
            <input type="text"
                name="nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                placeholder="nombre"
                disabled={esEdicion} // ✅ Deshabilitado solo en edición
            />
            <input type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                required
                placeholder="descripcion"
                disabled={esEdicion} // ✅ Deshabilitado solo en edición
            />


            <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                    id="estado"
                    name="estado"
                    value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })}
                    required
                >
                    <option value="">-- Seleccionar estado --</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
            </div>


            <select
                name="id_creador"
                value={form.id_creador}
                onChange={(e) => setForm({ ...form, id_creador: parseInt(e.target.value) })}
                required
                disabled={esEdicion}
            >
                <option value="">Selecciona un creador</option>
                {creadoresFiltrados.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nombres}
                    </option>
                ))}
            </select>


            <button type="submit">Guardar</button>
        </form>
    );
};