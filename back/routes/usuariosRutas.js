import { Router } from "express";
import { actualizarPorId, borrarPorId, buscarPorId, login, mostrarUsuarios, register } from "../db/usuariosDB.js";
import { console } from "inspector";
import { adminAutorizado, usuarioAutorizado } from "../middlewares/funcionesPassword.js";

const router = Router();

router.post("/registro", async(req,res)=>{
    const respuesta = await register(req.body);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/login",async(req,res)=>{
    const respuesta = await login(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/mostrar",async(req,res)=>{
    const respuesta = await mostrarUsuarios();
    console.log(respuesta.mensajeOriginal);
    res.status(respuesta.status).json(respuesta.token);
});

router.get("/buscarPorId/:id",async(req,res)=>{
    const respuesta = await buscarPorId(req.params);
    console.log(respuesta.mensajeOriginal);
    res.status(respuesta.status).json(respuesta.token);
});

router.delete("/borrarPorId/:id", async (req, res) => {
    const respuesta = await borrarPorId(req.params);
    console.log(respuesta.mensajeOriginal);  
    res.status(respuesta.status).json(respuesta.mensajeUsuario); 
});

router.put("/actualizarPorId/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const respuesta = await actualizarPorId({ id, updateData });
    console.log(respuesta.mensajeOriginal);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/salir", async (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: false }).status(200).json("Sesion cerrada con exito");
});

router.get("/usuariosLogueados",async(req,res)=>{
    const respuesta = usuarioAutorizado(req.cookies.token,req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/administradores",async(req,res)=>{
    const respuesta = await adminAutorizado(req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/cualquierUsuario",async(req,res)=>{
    res.json("Todos pueden usar sin loguearse");
});

export default router;