"use client";
import { useForm } from "react-hook-form";
import { conexionLogin } from "@/conexionApi/peticiones";
import { useRouter } from "next/navigation";  

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();  

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

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        backgroundColor: "#f0f0f0" 
    };

    return (
        <div style={containerStyle}>
            <form 
                style={formStyle} 
                onSubmit={handleSubmit(async (usuario) => {
                    const respuesta = await conexionLogin(usuario);
                    console.log(respuesta);
                    if (respuesta.data === "Usuario" && respuesta.status === 200) {
                        router.push("/usuariosLogueados");
                    } else if(respuesta.data === "admin" && respuesta.status === 200){
                        router.push("/administradores");
                    }
                    else {
                        console.error("Error al iniciar sesión");
                    }
                })}
            >
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Estás en Login</h1>
                <input 
                    style={inputStyle} 
                    type="text" 
                    placeholder="Usuario" 
                    {...register("username")} 
                /><br />
                <input 
                    style={inputStyle} 
                    type="password" 
                    placeholder="Password" 
                    {...register("password")} 
                /><br />
                <button 
                    style={buttonStyle} 
                    type="submit"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}
