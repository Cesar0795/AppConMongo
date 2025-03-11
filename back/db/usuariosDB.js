import User from "../models/usuarioModelo.js"
import { encriptarPassword,validarPassword } from "../middlewares/funcionesPassword.js";
import { mensaje } from "../libs/mensajes.js";
import { crearToken } from "../libs/jwt.js";
import { error } from "console";

export const register = async({username,email,password})=>{
    try {
        const usuarioDuplicado = await User.findOne({username});
        const emailDuplicado = await User.findOne({email});
        if(usuarioDuplicado || emailDuplicado){
            return mensaje(400,"Usuario ya existe");
        };
        const {salt,hash}=encriptarPassword(password);
        const  dataUser = new User({username,email,password:hash,salt});
        const respuestaMongo = await dataUser.save();
        const token = await crearToken({id:respuestaMongo._id});
        return mensaje(200,"Usuario registrado","",token);

    } catch (error) {
        return mensaje(400,"Error al registrar al usuario",error);
    }
}

export const login = async({username,password})=>{
    try {
        const usuarioEncontrado = await User.findOne({username});
        if(!usuarioEncontrado){
            return mensaje(400,"Datos incorrectos");
        }
        const passwordValido = validarPassword(password,usuarioEncontrado.salt,usuarioEncontrado.password);
        if(!passwordValido){
            return mensaje(400,"Datos incorrectos");
        }
        const token = await crearToken({id:usuarioEncontrado._id});
        return mensaje(200,usuarioEncontrado.tipo,"",token);
    } catch (error) {
        return mensaje(400,"Error al iniciar sesion",error);
    }
}

export const mostrarUsuarios = async()=>{
    try {
        const usuariosEncontrados = await User.find();
        if(usuariosEncontrados.length === 0){
            return mensaje(400,"Error al mostrar usuarios");
        }
        const usuariosFormateados = usuariosEncontrados.map(usuario => ({
            id: usuario._id,
            nombre: usuario.username,
            correo: usuario.email,
            tipo: usuario.tipo,
        }));
        return mensaje(200,"Usuarios: ","",usuariosFormateados);
    } catch (error) {
        return mensaje(400,"Error al encontrar los usuarios",error);
    }
}

export const buscarPorId = async({id})=>{
    try {
        const usuarioEncontradoPorId = await User.findById(id);
        if(usuarioEncontradoPorId.length === 0){
            return mensaje(400,"Error al encontrar al usuario");
        }
        const usuariosFormateados = {
            id: usuarioEncontradoPorId._id,
            username: usuarioEncontradoPorId.username,
            email: usuarioEncontradoPorId.email,
            password: usuarioEncontradoPorId.password,
            tipo: usuarioEncontradoPorId.tipo
        };
        return mensaje(200,"Usuario: ","",usuariosFormateados);
    } catch (error) {
        return mensaje(400, "Busqueda no realizada",error);
    }
}

export const borrarPorId = async({id})=>{
    try {
        const usuarioEncontradoPorId = await User.findByIdAndDelete(id);
        if(!usuarioEncontradoPorId){
            return mensaje(400,"Error al borrar al usuario");
        }
        return mensaje(200,"Usuario borrado correctamente");
    } catch (error) {
        return mensaje(400, "Busqueda no realizada",error);
    }
}

export const actualizarPorId = async ({ id, updateData }) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!usuarioActualizado) {
            return mensaje(404, "Usuario no encontrado.");
        }
        return mensaje(200, "Usuario actualizado correctamente.", "", usuarioActualizado);
    } catch (error) {
        return mensaje(400, "Error al actualizar el usuario.", error.message);
    }
};

export const isAdmin = async (id)=>{
    try {
        const usuario = await User.findById(id);
        if(usuario.tipo!="admin"){
            return false;
        }
        else{
            return true;
        }
    } catch (error) {
        return mensaje(400,"Admin no autorizado",error);
    }
}