"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { conexionBuscarPorId, actualizarPorId } from "@/conexionApi/peticiones";

export default function EditarUsuario() {  
    const [email, setEmail] = useState("");        
    const [tipo, setTipo] = useState("");
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await conexionBuscarPorId(id);
                console.log("Usuario obtenido:", respuesta.data);
                setEmail(respuesta.data.email);
                setTipo(respuesta.data.tipo);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };

        obtenerUsuario();
    }, [id]);

    const manejarActualizar = async (e) => {
        e.preventDefault();
        try {
            const datosActualizados = { 
                email, 
                tipo, 
            }; 
            await actualizarPorId(id, datosActualizados);
            router.push("/mostrar"); 
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

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
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
    };

    const inputStyle = {
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
    };

    const checkboxContainer = {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px"
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
        marginLeft: "10px"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <form style={formStyle} onSubmit={manejarActualizar}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Editar Usuario</h1>
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
                <button style={buttonStyle} type="submit">Guardar Cambios</button>
                <button style={cancelButtonStyle} type="button" onClick={() => router.push("/mostrar")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}
