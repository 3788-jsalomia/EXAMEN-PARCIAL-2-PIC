//Componente que enlaza a el form y el list
//vamos a darle la persisntencia a la bd
//NO TIENE PROPS
import type React from 'react';
import { useEffect, useState } from 'react';
import type { Usuario } from '../../interfaces/usuarios/Usuario';
import { LoginForm } from './loginForm';
import { UsuarioPage } from '../usuarios/UsuarioPage';
import { SubPage } from '../subscripcion/SubPage';
import { CursoPage } from '../cursos/CursoPage';




export const LoginPage: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);


    // Cargar usuario de localStorage si ya está logueado
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuarioLogueado');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const handleLogin = (usuario: Usuario) => {
        setUsuario(usuario);
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    };

    const handleLogout = () => {
        setUsuario(null);
        localStorage.removeItem('usuarioLogueado');
    };

    const renderContenido = () => {
        if (!usuario) return <LoginForm onLogin={handleLogin} />;
        console.log("Usuario logueado con exito:", usuario);
        switch (usuario.tipo_usuario) {
            case "administrador":
                return (
                    <>
                        <h2>Bienvenido, Administrador {usuario.nombres}</h2>
                        <UsuarioPage />
                    </>
                );
            case "creador":
                return (
                    <>
                        <h2>Bienvenido, Creador {usuario.nombres}</h2>
                        <CursoPage />
                    </>
                );
            case "consumidor":
                return (
                    <>
                        <h2>Bienvenido, {usuario.nombres}</h2>
                        <SubPage />
                    </>
                );
            default:
                return <p>Tipo de usuario no reconocido.</p>;
        }
    };

    return (
        <div className="app">
            {renderContenido()}
            {usuario && (
                <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
                    Cerrar sesión
                </button>
            )}

        </div>
    );
}