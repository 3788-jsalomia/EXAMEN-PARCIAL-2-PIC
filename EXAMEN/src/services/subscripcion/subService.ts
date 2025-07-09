const API_URL = "http://localhost:3000/api/suscripciones";

export const suscribirCurso = async (idUsuario: number, idCurso: number) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: idUsuario, id_curso: idCurso }),
    });
    if (!response.ok) throw new Error('Error al suscribirse xd');
    return response.json();
};

export const cancelarSuscripcion = async (idUsuario: number, idCurso: number) => {
    const response = await fetch(`${API_URL}/${idUsuario}`, {
        method: 'DELETE', // o DELETE según diseño
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: idUsuario, id_curso: idCurso }),
    });
    if (!response.ok) throw new Error('Error al cancelar la suscripción');
    return response.json();
};

export const consultarSuscripcion = async (idUsuario: number, idCurso: number) => {
    const response = await fetch(`${API_URL}?id_usuario=${idUsuario}&id_curso=${idCurso}`);
    if (!response.ok) throw new Error('No hay suscripción activa para este curso');
    return response.json();
};

