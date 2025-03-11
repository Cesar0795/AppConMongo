import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config.js"
import { mensaje } from "../libs/mensajes.js";
import { isAdmin } from "../db/usuariosDB.js";
import { log } from "console";

export function encriptarPassword(password){
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password,salt,10,64,"sha512").toString("hex");
    return{
        salt,
        hash
    }
}

export function validarPassword(password,salt,hash){
    const hashEvaluar = crypto.scryptSync(password,salt,10,64,"sha512").toString("hex");
    return hashEvaluar == hash;
}

export function usuarioAutorizado(token, req) {
    if (!token) {
        return { status: 400, mensajeUsuario: "Usuario no autorizado" };
    }

    try {
        const usuario = jwt.verify(token, process.env.SECRET_TOKEN);
        req.usuario = usuario;  // Si el token es válido, guarda los datos del usuario en la solicitud
        return { status: 200, mensajeUsuario: "Usuario autorizado" };
    } catch (error) {
        return { status: 400, mensajeUsuario: "Usuario no autorizado" };
    }
}

export async function adminAutorizado (req){
    const respuesta = usuarioAutorizado(req.cookies.token,req);
    if (respuesta.status!=200) {
        return mensaje(400,"Admin no autorizado");
    }
    if (await isAdmin(req.usuario.id)==false) {
        return mensaje(400,"Admin no autorizado");
    }
    return mensaje(200,"Admin autorizado");
}

const {salt,hash} = encriptarPassword("abc");
console.log("salt ------> "+salt);
console.log("hash ------> "+hash);

const aprobado = validarPassword("abc",salt,hash);
console.log("Resultado: "+aprobado);