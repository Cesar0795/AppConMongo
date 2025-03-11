"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { conexionBuscarPorId, actualizarPorId, borrarPorId, conexionAdministradores } from "@/conexionApi/peticiones";

export default function CuentaUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [tipo, setTipo] = useState("Usuario"); 
    const router = useRouter();

    useEffect(() => {
        const verificarAdministrador = async () => {
                    try {
                        const respuesta = await conexionAdministradores();
                        if (respuesta.data.tipo == "admin") {
                            router.push("/login");
                        } else {
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
                                    setEmail(respuesta.data.email);
                                    setUsername(respuesta.data.username);
                                    setTipo(respuesta.data.tipo || "Usuario");
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
            const datosActualizados = { email, username, tipo };

            const respuesta = await actualizarPorId(usuario.id, datosActualizados);

            if (respuesta && respuesta.data) {
                router.push("/salir");
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError(error.message);
        }
    };

    const manejarEliminar = async () => {
        try {
            await borrarPorId(usuario.id);
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

    const checkboxContainer = {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <form style={formStyle} onSubmit={manejarActualizar}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Editar Administrador</h1>
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
                <div style={checkboxContainer}>
                    <label style={{ marginRight: "8px", fontSize: "16px" }}>
                        ¿Quieres dar permisos de administrador?
                    </label>
                    <input 
                        type="checkbox" 
                        checked={tipo === "admin"} 
                        onChange={(e) => setTipo(e.target.checked ? "admin" : "Usuario")} 
                    />
                </div>
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
