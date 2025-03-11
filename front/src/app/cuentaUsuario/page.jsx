"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { conexionBuscarPorId, actualizarPorId, borrarPorId, conexionUsuariosLogueados } from "@/conexionApi/peticiones";

export default function CuentaUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const verificarAdministrador = async () => {
                    try {
                        const respuesta = await conexionUsuariosLogueados();
                        if (respuesta.data.tipo == "Usuario") {
                            router.push("/login");
                        } else {
                            const obtenerCookie = (nombre) => {
                                const valor = `; ${document.cookie}`;
                                const partes = valor.split(`; ${nombre}=`);
                                if (partes.length === 2) return partes.pop().split(";").shift();
                            };
                    
                            const obtenerUsuarioPorToken = async () => {
                                try {
                                    // Obtener el token desde las cookies usando document.cookie
                                    const token = obtenerCookie("token");
                                    if (!token) {
                                        router.push("/login"); // Si no hay token, redirigir al login
                                        return;
                                    }
                    
                                    // Decodificar el token para obtener el id (sin verificar la firma)
                                    const decoded = jwt.decode(token);
                                    if (!decoded || !decoded.id) {
                                        throw new Error("ID no encontrado en el token");
                                    }
                    
                                    // Llamar directamente a la función para buscar el usuario
                                    const respuesta = await conexionBuscarPorId(decoded.id);
                    
                                    if (!respuesta || !respuesta.data) {
                                        throw new Error("Usuario no encontrado");
                                    }
                    
                                    setUsuario(respuesta.data);
                                    setEmail(respuesta.data.email);
                                    setUsername(respuesta.data.username);
                                    setPassword(""); // Resetear el campo de contraseña
                                } catch (error) {
                                    console.error("Error al obtener usuario:", error);
                                    setError(error.message);
                                }
                            };
                    
                            obtenerUsuarioPorToken();
                        }
                    } catch (error) {
                        console.error("Error al verificar sesión:", error);
                        router.push("/login");
                    }
                };
        
            verificarAdministrador();        
    }, [router]);

    const manejarActualizar = async (e) => {
        e.preventDefault();
        try {
            // Crear el objeto con los datos actualizados
            const datosActualizados = {
                email,
                username,
                password,
            };

            // Llamar a la función para actualizar los datos del usuario
            const respuesta = await actualizarPorId(usuario.id, datosActualizados);

            if (respuesta && respuesta.data) {
                // Redirigir a la página de salir después de la actualización
                router.push("/salir");
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError(error.message);
        }
    };

    const manejarEliminar = async () => {
        try {
            // Llamar a la función para eliminar la cuenta del usuario
            await borrarPorId(usuario.id);
            // Redirigir a la página de salir después de eliminar la cuenta
            router.push("/salir");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            setError(error.message);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!usuario) {
        return <p>Cargando...</p>;
    }

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        width: "300px",
        marginTop: "50px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    };

    const inputStyle = {
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
    };

    const cancelButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
        marginLeft: "10px",
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <form style={formStyle} onSubmit={manejarActualizar}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Editar Usuario</h1>
                <input
                    style={inputStyle}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    style={inputStyle}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    style={inputStyle}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button style={buttonStyle} type="submit">
                    Guardar Cambios
                </button>
                <button
                    style={cancelButtonStyle}
                    type="button"
                    onClick={() => router.push("/")}
                >
                    Cancelar
                </button>
                <div style={{ marginTop: "20px" }}>
                <button
                    style={cancelButtonStyle}
                    type="button"
                    onClick={manejarEliminar}
                >
                    Eliminar Cuenta
                </button>
            </div>
            </form>
        </div>
    );
}
