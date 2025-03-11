"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { conexionUsuariosLogueados } from "@/conexionApi/peticiones";

export default function UsuariosLogueadosPage() {
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verificarSesion = async () => {
            setLoading(true);
            try {
                const respuesta = await conexionUsuariosLogueados();
                
                if (respuesta.status === 200) {
                    setMensaje("Aquí solo acceden usuarios con su sesión iniciada");
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error al verificar sesión:", error);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        verificarSesion();
    }, [router]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#007bff" }}>
                {loading ? "Verificando sesión..." : mensaje}
            </h1>
        </div>
    );
}
