"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { conexionSalir } from '@/conexionApi/peticiones';

const SalirPage = () => {
    const [mensaje, setMensaje] = useState("");  
    const router = useRouter();

    useEffect(() => {
        const cerrarSesion = async () => {
            try {
                await conexionSalir();
                router.push("/login");
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                setMensaje("Hubo un error al cerrar sesión. Intenta de nuevo.");
            }
        };

        cerrarSesion();
    }, [router]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
            flexDirection: "column"
        }}>
            <h1 style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#007bff",
                textAlign: "center",
                marginTop: "20px"
            }}>
                {mensaje || "Cerrando sesión..."}
            </h1>
        </div>
    );
};

export default SalirPage;

