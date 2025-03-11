"use client";
import { useEffect, useState } from 'react';
import { conexionAdministradores } from '@/conexionApi/peticiones';

export default function administradoresPage() {
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(true); // Para mostrar un estado de carga

    useEffect(() => {
        const obtenerMensaje = async () => {
            setLoading(true); // Empieza la carga al llamar la función
            try {
                // Asegúrate de que el token esté siendo enviado correctamente en las cookies o en los encabezados
                const respuesta = await conexionAdministradores();
                
                if (respuesta.status === 200 ) {
                    setMensaje('Administrador logueado');
                } else {
                    setMensaje('No eres administrador');
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
                setMensaje('No eres administrador');
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        obtenerMensaje();
    }, []);

    return (
        <div>
            <h1>Estado de la sesión</h1>
            {loading ? <p>Cargando...</p> : <p>{mensaje}</p>}
        </div>
    );
}


