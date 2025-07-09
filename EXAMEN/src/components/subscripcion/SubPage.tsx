//Componente que enlaza a el form y el list
//vamos a darle la persisntencia a la bd
//NO TIENE PROPS
import type React from 'react';
import { useEffect, useState } from 'react';
import type { Subscripcion } from '../../interfaces/subscripcion/Sub';
import type { Usuario } from '../../interfaces/usuarios/Usuario';
import type { Curso } from '../../interfaces/cursos/Curso';
import { SubForm } from './SubForm';

import { getUsuarios } from '../../services/usuarios/usuariosService';
import { getCursos } from '../../services/cursos/cursoService';
import { suscribirCurso } from '../../services/subscripcion/subService';


export const SubPage: React.FC = () => {
    const [form, setForm] = useState<Omit<Subscripcion, 'id'>>({
        id_curso: 0,
        id_usuario: 0, // este valor se asignará después
        fecha_suscripcion: new Date(),
    });
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // para los creadores


    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const cursosObtenidos = await getCursos();
                const usuariosObtenidos = await getUsuarios();
                setCursos(cursosObtenidos);
                setUsuarios(usuariosObtenidos);
            } catch (error: any) {
                alert('Error al cargar cursos o usuarios: ' + error.message);
            }
        };

        cargarDatos();
    }, []);

    const handleSuscribir = async () => {
        try {
            await suscribirCurso(form.id_usuario, form.id_curso); // ← aquí usas los dos valores
            alert('Suscripción exitosa');
        } catch (e: any) {
            alert(e.message);
        }
    };

  

    return (
        <div>
            <h1>Suscripciones</h1>
            <SubForm cursos={cursos} creadores={usuarios} onSubmit={handleSuscribir} />
        </div>
    );
}