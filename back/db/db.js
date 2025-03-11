import mongoose from "mongoose";
import { mensaje } from "../libs/mensajes.js";

export async function conectarDB() {
    try {
        //const conexion = await mongoose.connect("mongodb+srv://Cesar:Cesar@cluster0.rrfpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        const conexion = await mongoose.connect("mongodb://localhost:27017/MongoDBApp");
        //console.log(conexion);
        return mensaje(200,"ConexionOk")
    } catch (error) {
        return mensaje(400,"Error al conectarse a la BD",error);


    }   
}