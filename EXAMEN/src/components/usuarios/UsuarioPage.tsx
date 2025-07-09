//Componente que enlaza a el form y el list
//vamos a darle la persisntencia a la bd
//NO TIENE PROPS
import type React from 'react';
import { useEffect, useState } from 'react';
import type { Usuario } from '../../interfaces/usuarios/Usuario';
import { createUser, getUsuarios, updateUser,deleteUser } from '../../services/usuarios/usuariosService';
import { UserList } from './UsuarioList';
import { UserForm } from './UsuarioForm';


export const UsuarioPage: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [selectedUser, setSelectedUser] = useState<Partial<Usuario>>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const loadUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            alert((error as Error).message);
        }
    }

    useEffect(() => {
        loadUsuarios();
    }, []);


    const handleCreate = async (usuario: Omit<Usuario, "id">) => {
        try {
            const newUser = await createUser(usuario);
            setUsuarios([...usuarios, newUser]);
        } catch (error) {
            alert((error as Error).message);
        }
    }

    const handleUpdate = async (id: number, usuario: Omit<Usuario, "id">) => {
        try {
            const updatedUser = await updateUser(id, usuario);
            setUsuarios(usuarios.map(a => a.id === id ? updatedUser : a));
            setSelectedUser({});
            setIsEditing(false);

        } catch (error) {
            alert((error as Error).message);
        }
    }

    const handleDelete = async (id: number) => {
       try {
            await deleteUser(id);
            setUsuarios(usuarios.filter(a => a.id !== id));
            alert("Usuario eliminado correctamente");
            setSelectedUser({});

        } catch (error) {
            alert((error as Error).message);
        }
    }

    const startEdit = (usuarios: Usuario) => {
        setSelectedUser(usuarios);
        setIsEditing(true);
    }
    return (
        <div>
            <h1>Lista de autores</h1>
            <UserForm onSubmit={isEditing ? (data) => handleUpdate(selectedUser.id!, data) : handleCreate}initialData={selectedUser} />
            <UserList usuarios={usuarios} onEdit={startEdit} onDelete={handleDelete} />
        </div>
    );
}