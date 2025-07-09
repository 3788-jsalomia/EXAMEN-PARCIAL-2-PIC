import React, { useState } from "react";
import type { Curso } from "../../interfaces/cursos/Curso"; // Import the interface

interface Props {
    cursos: Curso[];
    //funcion para editar un autor
    onEdit: (cursos: Curso) => void;
    //funcion para eliminar un autor
    onDelete: (id: number) => void;
}

export const CursoList: React.FC<Props> = ({ cursos, onEdit, onDelete }) => {

    const [cursoId, setCursoId] = useState<string>('');
    const [cursoEncontrado, setCursoEncontrado] = useState<Curso | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    const handleBuscar = () => {
        const id = parseInt(cursoId);
        const curso = cursos.find(c => c.id === id);

        if (curso) {
            setCursoEncontrado(curso);
            setMensaje('');
        } else {
            setCursoEncontrado(null);
            setMensaje(`No se encontró un curso con ID ${id}`);
        }
    };

    return (
        <div className="user-list">
            <h3>Consultar Curso</h3>
            <div className="search-section">
                <input
                    type="number"
                    value={cursoId}
                    onChange={(e) => setCursoId(e.target.value)}
                    placeholder="Ingrese el ID del curso"
                />
                <button onClick={handleBuscar}>Buscar</button>
            </div>

            <button onClick={handleBuscar}>Buscar</button>
            {/*equivalente al if*/}
            {mensaje && <p>{mensaje}</p>}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Creador</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cursoEncontrado && (
                        <tr key={cursoEncontrado.id}>
                            <td>{cursoEncontrado.nombre}</td>
                            <td>{cursoEncontrado.descripcion}</td>
                            <td>{cursoEncontrado.estado}</td>
                            <td>{cursoEncontrado.id_creador}</td>
                            <td>
                                <div className="actions">
                                    <button onClick={() => onEdit(cursoEncontrado)}>Editar</button>
                                    <button onClick={() => onDelete(cursoEncontrado.id)}>Eliminar</button>
                                </div>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};