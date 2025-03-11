"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { conexionMostrar, borrarPorId, conexionAdministradores } from "@/conexionApi/peticiones";

export default function mostrar() {
    const [usuarios, setUsuarios] = useState([]);
    const router = useRouter();

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await conexionMostrar();
            setUsuarios(respuesta.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };
    useEffect(() => {
        const verificarAdministrador = async () => {
            try {
                const respuesta = await conexionAdministradores();
                if (respuesta.data.tipo == "admin") {
                    router.push("/login");
                } else {
                    obtenerUsuarios();  
                }
            } catch (error) {
                console.error("Error al verificar sesión:", error);
                router.push("/login");
            }
        };

        verificarAdministrador();
    }, [router]);

    const manejarBorrar = async (id) => {
        try {
            await borrarPorId(id);
            obtenerUsuarios(); 
        } catch (error) {
            console.error("Error al borrar usuario:", error);
        }
    };

    const irAEditar = (id) => {
        router.push(`/actualizar/${id}`);
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        marginTop: "50px"
    };

    const listStyle = {
        listStyleType: "none",
        padding: "0",
        width: "80%",
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        paddingBottom: "20px"
    };

    const listItemStyle = {
        padding: "15px",
        borderBottom: "1px solid #ccc",
        textAlign: "left",
        fontSize: "16px"
    };

    const buttonStyle = {
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginRight: "5px"
    };
    const buttonStyleBorrar = {
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#ff0000",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginRight: "5px"
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>Todos los usuarios</h1>
            <ul style={listStyle}>
                {usuarios.map((usuario) => (
                    <li key={usuario.id} style={listItemStyle}>
                        <strong>Nombre:</strong> {usuario.nombre} <br />
                        <strong>Correo:</strong> {usuario.correo} <br />
                        <strong>Tipo:</strong> {usuario.tipo} <br />
                        <button style={buttonStyle} onClick={() => irAEditar(usuario.id)}>Actualizar</button>
                        <button style={buttonStyleBorrar} onClick={() => manejarBorrar(usuario.id)}>Borrar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
