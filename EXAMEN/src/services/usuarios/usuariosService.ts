import type { Usuario } from '../../interfaces/usuarios/Usuario';

const API_URL = "http://localhost:3000/api/usuarios";

export const getUsuarios = async (): Promise<Usuario[]> => {
    //Clase de servicios
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los usuarios");

    return await response.json();

}

export const getUserById = async (id: number): Promise<Usuario> => {
    //Clase de servicios se obtiene un autor por su ID 
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener el User");

    return await response.json();
}


//Crear un nuevo autor
export const createUser = async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
    //Clase de servicios se crea un autor
    console.log("Usuario a enviar:", usuario);

    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
    const errorText = await response.text();
    console.error("Respuesta del servidor:", errorText);
    throw new Error(`Error al crear el Usuario: ${response.status} - ${errorText}`);
}


    return await response.json();
}

//update
export const updateUser = async(id:number, autor: Omit<Usuario, 'id'>): Promise<Usuario> => {
    //Clase de servicios se actualiza un autor
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
    });
    if (!response.ok) throw new Error("Error al actualizar el usuario");

    return await response.json();
}

//delete
export const deleteUser = async (id: number): Promise<void> => {
    //Clase de servicios se elimina un autor
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar el User");
}