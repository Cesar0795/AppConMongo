"use client"
import { useForm } from "react-hook-form";
import { conexionRegistro } from "@/conexionApi/peticiones";
import { redirect } from "next/navigation";
export default function Registro() {
    const { register, handleSubmit } = useForm();

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px'
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '8px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit(async (usuario) => {
            const respuesta = await conexionRegistro(usuario);
            console.log(respuesta);
            redirect("/");
        })}>
            <h1>Estás en Registro</h1>
            <input style={inputStyle} type="text" placeholder="Usuario" {...register("username")} /><br />
            <input style={inputStyle} type="text" placeholder="Correo" {...register("email")} /><br />
            <input style={inputStyle} type="text" placeholder="Password" {...register("password")} /><br />
            <button style={buttonStyle} type="submit">Guardar usuario</button>
        </form>
    );
}
