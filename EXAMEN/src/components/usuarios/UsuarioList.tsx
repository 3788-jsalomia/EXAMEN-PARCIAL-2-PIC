import React, { useState } from "react";
import type { Usuario } from "../../interfaces/usuarios/Usuario"; // Import the interface
import "../../estilos/usuarios/usuarioList.css"; // Import the CSS styles for the component

interface Props {
    usuarios: Usuario[];
    //funcion para editar un autor
    onEdit: (autor: Usuario) => void;
    //funcion para eliminar un autor
    onDelete: (id: number) => void;
}

export const UserList: React.FC<Props> = ({ usuarios, onEdit, onDelete }) => {

    const [usuarioId, setusuarioId] = useState<string>('');
    const [usuarioEncontrado, setusuarioEncontrado] = useState<Usuario | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    const handleBuscar = () => {
        const id = parseInt(usuarioId);
        const usuario = usuarios.find(c => c.id === id);

        if (usuario) {
            setusuarioEncontrado(usuario);
            setMensaje('');
        } else {
            setusuarioEncontrado(null);
            setMensaje(`No se encontró un usuario con ID ${id}`);
        }
    };

    return (
        <div className="user-list">
            <h1>Consultar usuarios por ID</h1>
            <div className="search-section">
                <input
                    type="number"
                    value={usuarioId}
                    onChange={(e) => setusuarioId(e.target.value)}
                    placeholder="Ingrese el ID del usuario"
                />
                <button onClick={handleBuscar}>Buscar</button>
            </div>

            <button onClick={handleBuscar}>Buscar</button>
            {/*equivalente al if*/}
            {mensaje && <p>{mensaje}</p>}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Tipo de usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarioEncontrado && (
                        <tr key={usuarioEncontrado.id}>
                            <td>{usuarioEncontrado.nombres}</td>
                            <td>{usuarioEncontrado.apellidos}</td>
                            <td>{usuarioEncontrado.email}</td>
                            <td>{usuarioEncontrado.contraseña}</td>
                            <td>{usuarioEncontrado.tipo_usuario}</td>
                            <td>
                                <div className="actions">
                                    <button className="edit-btn" onClick={() => onEdit(usuarioEncontrado)}>Editar</button>
                                    <button className="delete-btn" onClick={() => onDelete(usuarioEncontrado.id)}>Eliminar</button>
                                </div>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>


    );
};