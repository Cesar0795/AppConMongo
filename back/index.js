import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRutas from "./routes/usuariosRutas.js";
import { conectarDB } from "./db/db.js";

const app = express();

// Función para conectar a la base de datos
async function conexionBD() {
    try {
        var mensajeDB = await conectarDB();
        console.log(mensajeDB);
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}
conexionBD();

// Configuración de CORS con origen específico y habilitando cookies
const corsOptions = {
    origin: 'http://localhost:3001', // URL de tu frontend (ajústala según sea necesario)
    credentials: true, // Permite el envío de cookies
};

// Aplicación de CORS
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Rutas del backend
app.use("/api", usuariosRutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
