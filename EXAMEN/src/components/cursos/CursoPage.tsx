//Componente que enlaza a el form y el list
//vamos a darle la persisntencia a la bd
//NO TIENE PROPS
import type React from 'react';
import { useEffect, useState } from 'react';
import type { Curso } from '../../interfaces/cursos/Curso';
import { createCursos, getCursos, updateCursos, deleteCursos } from '../../services/cursos/cursoService'
import { CursoForm } from './CursoForm';
import { CursoList } from './CursoList';

//Usuarios
import type { Usuario } from '../../interfaces/usuarios/Usuario';
import { getUsuarios } from '../../services/usuarios/usuariosService';





export const CursoPage: React.FC = () => {

    const [cursos, setCurso] = useState<Curso[]>([]);
    const [selectedCurso, setselectedCurso] = useState<Partial<Curso>>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);

    //Usuarios 
    const [creadores, setCreadores] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setCreadores(data);
            } catch (error) {
                console.error("Error al cargar los usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    //Cursos

    const loadcursos = async () => {
        try {
            const data = await getCursos();
            setCurso(data);
        } catch (error) {
            alert((error as Error).message);
        }
    }

    useEffect(() => {
        loadcursos();
    }, []);


    const handleCreate = async (autor: Omit<Curso, "id">) => {
        try {
            const newUser = await createCursos(autor);
            setCurso([...cursos, newUser]);
        } catch (error) {
            alert((error as Error).message);
        }
    }

    const handleUpdate = async (id: number, Curso: Omit<Curso, "id">) => {
        try {
            const updatedUser = await updateCursos(id, Curso);
            setCurso(cursos.map(a => a.id === id ? updatedUser : a));
            setselectedCurso({});
            setIsEditing(false);

        } catch (error) {
            alert((error as Error).message);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteCursos(id);
            setCurso(cursos.filter(a => a.id !== id));
            alert("Curso eliminado correctamente");
            setselectedCurso({});

        } catch (error) {
            alert((error as Error).message);
        }
    }

    const startEdit = (curso: Curso) => {
        setselectedCurso(curso);
        setIsEditing(true);
    }
    return (
        <div>
            <h1>Cursos</h1>
            <CursoForm onSubmit={isEditing ? (data) => handleUpdate(selectedCurso.id!, data) : handleCreate} initialData={selectedCurso} creadores={creadores} />
            <CursoList cursos={cursos} onEdit={startEdit} onDelete={handleDelete} />
        </div>
    );
}