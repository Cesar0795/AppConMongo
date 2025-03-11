"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation"; 
import { conexionBuscarPorId } from "@/conexionApi/peticiones";

export default function BuscarUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter(); 

    useEffect(() => {
        const obtenerCookie = (nombre) => {
            const valor = `; ${document.cookie}`;
            const partes = valor.split(`; ${nombre}=`);
            if (partes.length === 2) return partes.pop().split(";").shift();
        };

        const obtenerUsuarioPorToken = async () => {
            try {
                const token = obtenerCookie("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const decoded = jwt.decode(token);
                if (!decoded || !decoded.id) {
                    throw new Error("ID no encontrado en el token");
                }


                const respuesta = await conexionBuscarPorId(decoded.id);

                if (!respuesta || !respuesta.data) {
                    throw new Error("Usuario no encontrado");
                }

                setUsuario(respuesta.data);


                if (respuesta.data.tipo === "admin") {
                    router.push("/cuentaAdministrador");
                } else if (respuesta.data.tipo === "Usuario") {
                    router.push("/cuentaUsuario");
                }

            } catch (error) {
                console.error("Error al obtener usuario:", error);
                setError(error.message);
            }
        };

        obtenerUsuarioPorToken();
    }, [router]); 

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p>Cargando...</p>
        </div>
    );
}
