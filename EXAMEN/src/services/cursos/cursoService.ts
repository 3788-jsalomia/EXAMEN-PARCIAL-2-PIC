import type { Curso } from '../../interfaces/cursos/Curso';

const API_URL = "http://localhost:3000/api/cursos";

export const getCursos = async (): Promise<Curso[]> => {
    //Clase de servicios
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los usuarios");

    return await response.json();
}

export const getCursosById = async (id: number): Promise<Curso> => {
    //Clase de servicios se obtiene un autor por su ID 
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener el Curso");

    return await response.json();
}


//Crear un nuevo autor
export const createCursos = async (autor: Omit<Curso, 'id'>): Promise<Curso> => {
    //Clase de servicios se crea un autor
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
    });
    if (!response.ok) throw new Error("Error al crear el Curso");

    return await response.json();
}

//update
export const updateCursos = async(id:number, autor: Omit<Curso, 'id'>): Promise<Curso> => {
    //Clase de servicios se actualiza un autor
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
    });
    if (!response.ok) throw new Error("Error al actualizar el Curso");

    return await response.json();
}

//delete
export const deleteCursos = async (id: number): Promise<void> => {
    //Clase de servicios se elimina un autor
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar el Curso");
}

//Cambiar estado del curso
export const cambiarEstado = async (id: number, estado: string): Promise<Curso> => {
    //Clase de servicios se cambia el estado del curso
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ estado })
    });
    if (!response.ok) throw new Error("Error al cambiar el estado del Curso");

    return await response.json();
}