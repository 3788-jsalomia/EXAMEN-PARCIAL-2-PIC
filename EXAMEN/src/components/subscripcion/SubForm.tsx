import React, { useEffect, useState } from "react";
import type { Subscripcion } from "../../interfaces/subscripcion/Sub";
import type { Usuario } from "../../interfaces/usuarios/Usuario";
import type { Curso } from "../../interfaces/cursos/Curso";
import { suscribirCurso, cancelarSuscripcion,consultarSuscripcion } from "../../services/subscripcion/subService";
import "../../estilos/subs/sub.css";


interface Props {
    initialData?: Partial<Subscripcion>;
    cursos: Curso[];
    onSubmit: (subscripcion: Omit<Subscripcion, "id">) => void;
    creadores: Usuario[];
}

export const SubForm: React.FC<Props> = ({ initialData = {}, cursos, onSubmit, creadores }) => {
    const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);
    const [form, setForm] = useState<Omit<Subscripcion, "id">>({
        id_curso: 0,
        id_usuario: 0,
        fecha_suscripcion: new Date(),
    });

    // Cargar usuario logueado de localStorage y actualizar el formulario
    useEffect(() => {
        try {
            const stored = localStorage.getItem("usuarioLogueado");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed.id === "number") {
                    setUsuarioLogueado(parsed);
                    setForm((prev) => ({
                        ...prev,
                        id_usuario: parsed.id,
                    }));
                }
            }
        } catch (error) {
            console.error("Error al leer usuarioLogueado:", error);
        }
    }, []);

    // Actualizar formulario si cambia initialData o usuarioLogueado
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setForm({
                id_curso: initialData.id_curso ?? 0,
                id_usuario: usuarioLogueado?.id ?? 0,
                fecha_suscripcion: initialData.fecha_suscripcion
                    ? new Date(initialData.fecha_suscripcion)
                    : new Date(),
            });
        }
    }, [initialData, usuarioLogueado]);

    // Maneja cambio en selección de curso
    const handleChangeCurso = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cursoId = parseInt(e.target.value, 10);
        setForm((prev) => ({ ...prev, id_curso: cursoId }));
    };

    // Maneja submit para guardar suscripción
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.id_curso) {
            alert("Selecciona un curso");
            return;
        }
        if (!form.id_usuario || form.id_usuario === 0) {
            alert("Usuario no válido. Inicia sesión nuevamente.");
            return;
        }
        onSubmit(form);
        setForm({ id_curso: 0, id_usuario: form.id_usuario, fecha_suscripcion: new Date() });
    };

    // Maneja suscripción al curso
    const handleSuscribir = async () => {
        if (!form.id_curso) {
            alert("Selecciona un curso para suscribirte");
            return;
        }
        if (!form.id_usuario || form.id_usuario === 0) {
            alert("Usuario inválido. Inicia sesión nuevamente.");
            return;
        }
        try {
            console.log("Enviando a suscribir:", {
                id_usuario: form.id_usuario,
                id_curso: form.id_curso,
            });
            await suscribirCurso(form.id_usuario, form.id_curso);
            alert("Suscripción exitosa");
        } catch (e: any) {
            alert(e.message || "Error al suscribirse");
        }
    };

    // Maneja cancelación de suscripción
    const handleCancelar = async () => {
        if (!form.id_curso) {
            alert("Selecciona un curso para cancelar la suscripción");
            return;
        }
        if (!form.id_usuario || form.id_usuario === 0) {
            alert("Usuario inválido.");
            return;
        }
        try {
            await cancelarSuscripcion(form.id_usuario, form.id_curso);
            alert("Suscripción cancelada");
        } catch (e: any) {
            alert(e.message || "Error al cancelar la suscripción");
        }
    };

   

    // ...

    const handleConsultar = async () => {
        try {
            if (!form.id_usuario || form.id_usuario === 0) {
                alert("Usuario inválido. Inicia sesión nuevamente.");
                return;
            }

            if (!form.id_curso || form.id_curso === 0) {
                alert("Selecciona un curso para consultar la suscripción.");
                return;
            }

            const suscripcion = await consultarSuscripcion(form.id_usuario, form.id_curso);

            alert(`Suscripción encontrada:
• Usuario ID: ${suscripcion.id_usuario}
• Curso ID: ${suscripcion.id_curso}
• Fecha: ${new Date(suscripcion.fecha_suscripcion).toLocaleDateString()}`);

        } catch (e: any) {
            alert(e.message || "No hay suscripción activa para este curso.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="sub-form">
            <div className="form-group">
                <label htmlFor="curso-select">Curso:</label>
                <select
                    id="curso-select"
                    value={form.id_curso}
                    onChange={handleChangeCurso}
                    required
                >
                    <option value={0}>-- Selecciona un curso --</option>
                    {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                            {curso.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Usuario:</label>
                <input type="text" value={usuarioLogueado?.nombres || ""} disabled />
            </div>

            <div className="button-group">
                <button type="submit" className="btn-primary">
                    Guardar suscripción
                </button>
                <button
                    type="button"
                    onClick={handleSuscribir}
                    className="btn-success"
                    data-testid="btn-suscribir"
                >
                    Suscribir al curso
                </button>
                <button
                    type="button"
                    onClick={handleCancelar}
                    className="btn-danger"
                >
                    Cancelar suscripción
                </button>

                <button
                    type="button"
                    onClick={handleConsultar}
                    className="btn-info"
                    style={{ marginRight: "0.5rem" }}
                >
                    Consultar suscripciones
                </button>
            </div>
        </form>
    );
};
